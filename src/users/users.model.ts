import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Basket } from "src/basket/basket.model";
import { Order } from "src/orders/orders.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


interface UserCreationAttrs {
    email: string
    password: string
    address: string
    name: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'user@email.ru', description: 'Email пользователя' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '123456789', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: true, description: 'Забанен или нет' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({ example: 'За хулиганство', description: 'Причина бана' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @ApiProperty({ example: 'г.Москва, ул.Пушкина, д.4, кв.4', description: 'Адрес пользователя' })
    @Column({ type: DataType.STRING, allowNull: true })
    address: string

    @ApiProperty({ example: 'Дмитрий', description: 'Имя пользователя' })
    @Column({ type: DataType.STRING, allowNull: true })
    name: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Basket)
    basket: Basket;

    @HasMany(() => Order)
    orders: Order[]

}