import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ExecutionContext,
  Logger,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ref } from "process";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, { timestamp: true})

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private handleError(error: unknown): never {
    const message = error instanceof Error ? error.message : String(error);
    this.logger.error(message, error instanceof Error ? error.stack : undefined);
    throw new InternalServerErrorException('Something went wrong');
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    role: string | undefined
  ) {

    this.logger.log("Registering user");
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) {
      this.logger.warn("User with this email already exists");
      throw new BadRequestException("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: role
      },
    });

    return { message: "User registered successfully"}
  }

  async validateUser(email: string, password: string) {
    this.logger.log("Validating user");
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      this.logger.warn("User not found");
      return null;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      this.logger.warn("Invalid password attempt");
      return null;
    }
    return user;
  }

  async issueTokens(userId: number) {
    this.logger.log("Issuing tokens");
    const role = (await this.prisma.user.findUnique({where: {id: userId}}))?.role;
    const payload = { sub: userId, role};

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("ACCESS_SECRET"),
      expiresIn:
        (this.configService.get<string>("ACCESS_EXPIRES_IN") as any) || "15m",
    });

    const refreshId = uuidv4();
    const refreshToken = this.jwtService.sign(
      { sub: userId, rid: refreshId },
      {
        secret: this.configService.get<string>("REFRESH_SECRET"),
        expiresIn:
          (this.configService.get<string>("REFRESH_EXPIRES_IN") as any) ||
          "60d",
      }
    );

    const expiryDate = new Date(
      Date.now() +
        this.parseDuration(
          this.configService.get<string>("REFRESH_EXPIRES_IN") || "60d"
        )
    );

    const tokenHash = await bcrypt.hash(refreshToken, 10);

    await this.prisma.refreshToken.create({
      data: {
        rid: refreshId,
        token: tokenHash,
        userId: userId,
        expiresAt: expiryDate,
      },
    });

    return { accessToken, refreshToken };
  }

  parseDuration(duration: string): number {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 60 * 24 * 60 * 60 * 1000;
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case "s":
        return value * 1000;
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "d":
        return value * 24 * 60 * 60 * 1000;
      default:
        throw new Error("Invalid duration unit");
    }
  }

  async login(email: string, password: string) {
    this.logger.log("Logging in user");
    const user = await this.validateUser(email, password);
    if (!user) {
      this.logger.warn("Invalid credentials provided");
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.issueTokens(user.id);
  }

  async refresh(refreshToken: string) {
    this.logger.log("Refreshing tokens...");
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get("REFRESH_SECRET"),
      });
    } catch {
      this.logger.warn("Invalid refresh token provided");
      throw new UnauthorizedException("Invalid refresh token");
    }

    const userId = payload.sub;

    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId },
    });

    if (tokens.length === 0) {
      this.logger.warn("No refresh tokens found for user");
      throw new UnauthorizedException("Invalid refresh token");
    }

    let matched: (typeof tokens)[0] | null = null;

    for (const token of tokens) {
      const ok = await bcrypt.compare(refreshToken, token.token);
      if (ok) {
        matched = token;
        break;
      }
    }

    if (!matched) {
      this.logger.warn("Refresh token not found in database");
      throw new UnauthorizedException("Refresh token not found");
    }

    await this.prisma.refreshToken.delete({
      where: { id: matched.id },
    });

    return this.issueTokens(userId);
  }

  async logout(refreshToken: string) {
    this.logger.log("Logging out user");
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get("REFRESH_SECRET"),
      });
    } catch (e) {
      const until = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await this.prisma.blackListedToken.create({
        data: {
          jti: refreshToken,
          expiresAt: until,
        },
      });
    }
    const expiry = payload.expiresIn
      ? new Date(payload.expiresIn * 1000)
      : new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this.prisma.blackListedToken.create({
      data: { jti: refreshToken, expiresAt: expiry },
    });
    const userId = payload.sub;
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }

  async blacklistAccessToken(accessToken: string) {
    this.logger.log("Blacklisting access token");
    let payload: any;
    try {
      payload = this.jwtService.verify(accessToken, {
        secret: this.configService.get("JWT_ACCESS_SECRET"),
      });
    } catch (e) {
      const until = new Date(Date.now() + 60 * 60 * 1000);
      await this.prisma.blackListedToken.create({
        data: { jti: accessToken, expiresAt: until },
      });
      return;
    }
    const exp = payload.exp
      ? new Date(payload.exp * 1000)
      : new Date(Date.now() + 60 * 60 * 1000);
    await this.prisma.blackListedToken.create({
      data: { jti: accessToken, expiresAt: exp },
    });
  }

  async isAccessTokenBlacklisted(token: string) {
    const b = await this.prisma.blackListedToken.findFirst({
      where: { jti: token },
    });
    return !!b;
  }

  async whoAmI(req: Request) {
    this.logger.log("Fetching user info");
    try {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req) as string;
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>("ACCESS_SECRET"),
      });
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });

      if (!user) {
        this.logger.warn("User not found");
        throw new UnauthorizedException("User not found");
      }
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      };
    } catch (error) {
      this.logger.warn(error.message);
      return error.message;
    }
  }

}
