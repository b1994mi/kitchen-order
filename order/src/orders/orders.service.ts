import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';
import { Food } from '../foods/food.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @Inject('MATH_SERVICE') private rrqKaliClient: ClientProxy,
  ) { }

  async findOne(id: number): Promise<Order> {
    const r = await this.ordersRepository.findOneBy({ id });
    console.log('r', r);
    return r;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const foods: Food[] = []
    for (let i = 0; i < createOrderDto.foods.length; i++) {
      const e = createOrderDto.foods[i];
      const f = new Food
      f.id = e

      foods.push(f)
    }

    const order = new Order
    order.name = createOrderDto.name
    order.custEmail = createOrderDto.custEmail
    order.foods = foods

    this.ordersRepository.save(order)

    this.rrqKaliClient.emit('order.process', order)
    return order;
  }
}
