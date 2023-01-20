import { ApiProperty } from '@nestjs/swagger'

export class RemoveProductDto {
    @ApiProperty({ example: 1, description: 'id пользователя' })
    readonly productId: number
    readonly basketId: number
}