import { ApiProperty } from '@nestjs/swagger'

export class CreateBasketDto {
    @ApiProperty({ example: 1, description: 'id пользователя' })
    readonly userId: number
}