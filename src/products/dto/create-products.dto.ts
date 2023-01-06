import { ApiProperty } from "@nestjs/swagger"

export class CreateProductsDto {
    @ApiProperty({ example: 'Роза английская кустовая', description: 'Название товара' })
    readonly name: string
    @ApiProperty({ example: 'Какое-то описание', description: 'описание товара' })
    readonly description: string
    @ApiProperty({ example: 1200, description: 'Цена товара' })
    readonly price: number
    @ApiProperty({ example: 12, description: 'Количество товара' })
    readonly quantity: number
    @ApiProperty({ example: 1200, description: 'Изображение формата jpg' })
    readonly image: any
    @ApiProperty({ example: " [1,2,3,4] or '1, 2, 3, 4' ", description: 'ID категорий, в троку через запятую, либо массив цифр' })
    readonly categories: number[] | string

}