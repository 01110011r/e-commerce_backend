import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDTO } from "src/shared/dto/auth-dto";
import { UserService } from "src/shared/user.service";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async validateUser(authDTO: AuthDTO) {
        const user = await this.userService.findByUsername(authDTO);
console.log(authDTO.password, user);

        if(user) {
            if(await bcrypt.compare(authDTO.password, user.password)){
                return {username: user.username, suitable: true, msg: null };
            }
            return {username: null, suitable: false,msg: "Invalid password  :("};
        }
        return {username: null, suitable: false, msg: 'Oops sorry, User not found :('};
    }

    async Register(authDTO: AuthDTO) {
        const newUser = await this.userService.create(authDTO);

        const payload = {
            username: newUser.username
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async Login(authDTO: AuthDTO) {

        const check = await this.validateUser(authDTO);

       if(check.suitable) {

        const payload = {
            username: check.username
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
       }

       return {
        msg: check.msg
       }
    }
}