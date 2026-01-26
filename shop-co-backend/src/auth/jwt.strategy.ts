import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import "dotenv/config"
import type { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(
        private readonly configService: ConfigService
    ){
        super({
            jwtFromRequest: (req: Request) => {
                return req.cookies["accessToken"]
            },
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_SECRET as string
        })
    }

    async validate(payload: any){
        return {userId: payload.sub, role: payload.role};
    }
}