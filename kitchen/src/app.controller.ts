import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order.process')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.appService.bill(data);
    // this.rmqService.ack(context);
  }
}
