import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { CategoryProduct } from "./category-product.model";

interface CategoryCreationAttrs {
    name: string
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'Экслюзивные', description: 'Название категории' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @BelongsToMany(() => Product, () => CategoryProduct)
    products: Product[]
}