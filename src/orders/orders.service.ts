import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';
import { Food } from 'src/foods/food.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) { }

  async findOne(id: number): Promise<Order> {
    const r = await this.ordersRepository.findOneBy({ id });
    console.log('r', r);
    return r;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const food1 = new Food
    food1.id = 1

    const order = new Order
    order.name = createOrderDto.name
    order.custEmail = createOrderDto.custEmail
    order.foods = [food1]

    this.ordersRepository.save(order)
    return order;
  }
}
