import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Order } from "./orders.model";


@Table({ tableName: 'orders-products', createdAt: false, updatedAt: false })
export class OrderProduct extends Model<OrderProduct> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number

    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    orderId: number
}