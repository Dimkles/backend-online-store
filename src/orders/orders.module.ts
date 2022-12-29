import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';
import { OrderProduct } from './orders-products.model';
import { OrdersController } from './orders.controller';
import { Order } from './orders.model';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([User, Order, OrderProduct, Product]),
  ]
})
export class OrdersModule { }
