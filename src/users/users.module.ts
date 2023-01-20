import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Basket } from 'src/basket/basket.model';
import { BasketModule } from 'src/basket/basket.module';
import { Order } from 'src/orders/orders.model';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Basket, Order]),
    RolesModule,
    BasketModule,
    forwardRef(() => AuthModule)

  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
