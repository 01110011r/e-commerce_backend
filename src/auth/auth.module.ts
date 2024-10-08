import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SharedModule } from "src/shared/shared.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import configuration from "src/config/configuration";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
        ConfigModule.forRoot(),
        SharedModule,
        PassportModule,
        JwtModule.register({
            secret: configuration().jwt.secretorprivatekey,
            signOptions: { expiresIn: '30d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}