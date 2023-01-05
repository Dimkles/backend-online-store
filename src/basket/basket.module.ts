import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { ProductsModule } from 'src/products/products.module';
import { User } from 'src/users/users.model';
import { BasketProduct } from './basket-product.model';
import { BasketController } from './basket.controller';
import { Basket } from './basket.model';
import { BasketService } from './basket.service';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    SequelizeModule.forFeature([User, Basket, BasketProduct, Product]),
    forwardRef(() => ProductsModule)
  ],
  exports: [
    BasketService
  ]
})
export class BasketModule { }
