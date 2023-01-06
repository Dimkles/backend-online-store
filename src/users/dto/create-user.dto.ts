import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {

    @ApiProperty({ example: 'user@email.ru', description: 'Email пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Неккоректный email' })
    readonly email: string

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
    readonly password: string

    @ApiProperty({ example: 'г.Москва, ул.Пушкина, д.4, кв.4', description: 'адрес' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(5, 70, { message: 'Не меньше 5 и не больше 70' })
    readonly address: string

    @ApiProperty({ example: 'Дмитирй', description: 'Имя' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(2, 16, { message: 'Не меньше 2 и не больше 16' })
    readonly name: string
}