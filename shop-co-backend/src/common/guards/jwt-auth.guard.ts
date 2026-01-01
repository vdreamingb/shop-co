import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const auth = req.headers["authorization"];
    if (!auth) {
      throw new UnauthorizedException();
    }

    const token = auth.split(" ")[1];
    const black = await this.prismaService.blackListedToken.findFirst({
      where: { jti: token },
    });
    if (black) throw new UnauthorizedException("Token revoked");

    return (await super.canActivate(context)) as boolean;
  }
}
