import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    console.log('Billing...', data);
  }
}
