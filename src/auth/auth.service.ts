import { Injectable } from "@nestjs/common";
import { AuthDTO } from "src/shared/dto/auth-dto";
import { UserService } from "src/shared/user.service";



@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}

    async Register(authDTO: AuthDTO) {
        return this.userService.create(authDTO)
    }

    async Login(authDTO: AuthDTO) {
        return 'logged'
    }
}