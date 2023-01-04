import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { OrderProduct } from "./orders-products.model";

interface OrderCreationAttrs {
    name: string
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 3, description: 'Id пользователя' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @BelongsToMany(() => Product, () => OrderProduct)
    products: Product[]
}