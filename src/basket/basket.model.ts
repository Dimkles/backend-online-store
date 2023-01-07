import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { User } from "src/users/users.model";
import { BasketProduct } from "./basket-product.model";

interface BasketCreationAttrs {
    userId: number
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

    @BelongsTo(() => User)
    user: User


    @BelongsToMany(() => Product, () => BasketProduct)
    products: Product[]
}
