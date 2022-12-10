import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({ example: 'ReactJS', description: 'Название категории' })
    readonly name: string
}