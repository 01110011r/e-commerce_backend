import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "src/shared/dto/auth-dto";



@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('register')
    async Register(@Body() authDTO: AuthDTO) {
        return await this.authService.Register(authDTO);
    }

    @Post('login')
    async Login(@Body() authDTO: AuthDTO) {
        return await this.authService.Login(authDTO);
    }
}