import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth/constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello' + jwtConstants.secret;
  }
}
