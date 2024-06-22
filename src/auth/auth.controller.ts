import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "src/shared/dto/auth-dto";
import { AuthGuard } from "@nestjs/passport";



@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @UseGuards(AuthGuard('jwt'))
    @Get()
    async check() {
        return 'ok'
    }



    @Post('register')
    async Register(@Body() authDTO: AuthDTO) {
        return await this.authService.Register(authDTO);
    }

    @Post('login')
    async Login(@Body() authDTO: AuthDTO) {
        return await this.authService.Login(authDTO);
    }
}