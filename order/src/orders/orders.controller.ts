import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderDto } from './order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get(':id')
  findOne(@Param() params: any): Promise<Order> {
    return this.ordersService.findOne(params.id);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @EventPattern('order.process')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('lah ini dari orders', data)
  }
}
