import { ApiProperty } from '@nestjs/swagger'

export class RemoveAllProductDto {
    @ApiProperty({ example: 1, description: 'id пользователя' })
    readonly basketId: number
}