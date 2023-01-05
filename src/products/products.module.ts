import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { Product } from './products.model';
import { CategoryProduct } from 'src/categories/category-product.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrderProduct } from 'src/orders/orders-products.model';
import { Order } from 'src/orders/orders.model';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    SequelizeModule.forFeature([Category, Product, CategoryProduct, Order, OrderProduct]),
    FilesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [ProductsService]
})
export class ProductsModule { }
