import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { RmqModule } from '@app/common';
import { Order } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    RmqModule.register({
      name: 'MATH_SERVICE',
    }),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule { }
