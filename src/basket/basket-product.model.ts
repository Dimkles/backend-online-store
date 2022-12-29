import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Basket } from "./basket.model";


@Table({ tableName: 'basket-products', createdAt: false, updatedAt: false })
export class BasketProduct extends Model<BasketProduct> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number

    @ForeignKey(() => Basket)
    @Column({ type: DataType.INTEGER })
    basketId: number
}