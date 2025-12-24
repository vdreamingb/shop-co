import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ExecutionContext,
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
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) {
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
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }

  async issueTokens(userId: number) {
    console.log(userId);
    const payload = { sub: userId };

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
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.issueTokens(user.id);
  }

  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get("REFRESH_SECRET"),
      });
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const userId = payload.sub;

    const tokens = await this.prisma.refreshToken.findMany({
      where: { userId },
    });

    if (tokens.length === 0) {
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
      throw new UnauthorizedException("Refresh token not found");
    }

    await this.prisma.refreshToken.delete({
      where: { id: matched.id },
    });

    return this.issueTokens(userId);
  }

  async logout(refreshToken: string) {
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
      return error.message;
    }
  }
}
