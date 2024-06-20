import { Injectable } from '@nestjs/common';
import constants from './auth/constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello' + constants().secret;
  }
}
