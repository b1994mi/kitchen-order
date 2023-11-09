import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Order } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule { }
