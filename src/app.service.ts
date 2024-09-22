import { Injectable } from '@nestjs/common';
import configuration from './config/configuration';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello'+ configuration().jwt.secretorprivatekey;
  }
}
