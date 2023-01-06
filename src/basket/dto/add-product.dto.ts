import { ApiProperty } from '@nestjs/swagger'

export class AddProductDto {
    @ApiProperty({ example: 1, description: 'id товара' })
    readonly productId: number
    readonly basketId: number
    readonly quantity: number
}