import { ApiProperty } from "@nestjs/swagger";

export class CreateTokenDto {
    @ApiProperty({ example: 'sdf9g875w4gjp984pj3fj90435', description: 'Токен' })
    readonly refresh: string
    @ApiProperty({ example: 1, description: 'Id пользователя' })
    readonly userId: number
}