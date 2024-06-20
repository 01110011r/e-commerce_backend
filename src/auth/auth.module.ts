import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SharedModule } from "src/shared/shared.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import constants from "./constants";


@Module({
    imports: [
        ConfigModule.forRoot(),
        SharedModule,
        PassportModule,
        JwtModule.register({
            secretOrPrivateKey: constants().secret,
            signOptions: { expiresIn: '30d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}