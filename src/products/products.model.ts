import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { CategoryProduct } from "src/categories/category-product.model";
import { Category } from "src/categories/categories.model";

interface ProductsCreationAttrs {
    name: string
    briefDescription: string
    detailDescription: string
    link: string
    imagejpg: string
    imagewebp: string
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductsCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Лендинг', description: 'Название товара' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @ApiProperty({ example: 'Какое-то описание', description: 'Краткое описание товара' })
    @Column({ type: DataType.TEXT, allowNull: false })
    briefDescription: string
    @ApiProperty({ example: 'Какое-то описание', description: 'Подробное описание товара' })
    @Column({ type: DataType.TEXT, allowNull: false })
    detailDescription: string

    @ApiProperty({ example: 1200, description: 'Цена' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number

    @ApiProperty({ example: 'imageName.jpg', description: 'Изображение в формате jpg' })
    @Column({ type: DataType.STRING, allowNull: false })
    imagejpg: string

    @ApiProperty({ example: 'imageName.webp', description: 'Изображение в формате webp' })
    @Column({ type: DataType.STRING, allowNull: false })
    imagewebp: string

    @BelongsToMany(() => Category, () => CategoryProduct)
    categories: Category[]
}