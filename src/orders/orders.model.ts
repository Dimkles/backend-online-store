import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { User } from "src/users/users.model";
import { OrderProduct } from "./orders-products.model";

interface OrderCreationAttrs {
    userId: number
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => User)
    @ApiProperty({ example: 3, description: 'Id пользователя' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => Product, () => OrderProduct)
    products: Product[]

}