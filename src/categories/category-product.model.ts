import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/products.model";
import { Category } from "./categories.model";


@Table({ tableName: 'category_product', createdAt: false, updatedAt: false })
export class CategoryProduct extends Model<CategoryProduct> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number
}