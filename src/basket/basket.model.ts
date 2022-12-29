import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { User } from "src/users/users.model";
import { BasketProduct } from "./basket-product.model";

interface BasketCreationAttrs {
    name: string
}

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket, BasketCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => User)
    @ApiProperty({ example: 1, description: 'id пользователя' })
    @Column({ type: DataType.INTEGER, unique: true })
    userId: number

    @BelongsToMany(() => Product, () => BasketProduct)
    products: Product[]
}