import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './categories/categories.module';
import * as path from 'path'
import { Category } from './categories/categories.model';
import { Product } from './products/products.model';
import { CategoryProduct } from './categories/category-product.model';
import { Token } from './auth/token.model';
import { BasketModule } from './basket/basket.module';
import { OrdersModule } from './orders/orders.module';
import { Basket } from './basket/basket.model';
import { BasketProduct } from './basket/basket-product.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ProductsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, Token, UserRoles, Category, Product, CategoryProduct, Basket, BasketProduct],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    CategoriesModule,
    BasketModule,
    OrdersModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
