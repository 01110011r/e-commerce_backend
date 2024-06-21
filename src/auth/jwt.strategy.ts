import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import constants from "./constants";
import { AuthService } from "./auth.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants().secret
        });
    }


    async validate(payload: any, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);

        if(!user.suitable) {
            return done(
                new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
                false
            );
        }
        return done(null, user, payload.iat)
    }
}