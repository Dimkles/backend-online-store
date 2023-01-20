import { ApiProperty } from '@nestjs/swagger'
import { Basket } from 'src/basket/basket.model'
import { Product } from 'src/products/products.model'
import { User } from 'src/users/users.model'

export class CreateOrderDto {
    @ApiProperty({ example: 1, description: 'id пользователя' })
    readonly basketId: number
    readonly address: string
}