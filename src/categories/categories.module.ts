import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { Product } from 'src/products/products.model';
import { CategoryProduct } from './category-product.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category, Product, CategoryProduct]),
    forwardRef(() => AuthModule)
  ],

})
export class CategoriesModule { }
