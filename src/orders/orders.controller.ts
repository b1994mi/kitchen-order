import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity'
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
}
