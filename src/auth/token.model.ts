import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";


interface TokensCreationAttrs {
    refresh: string
    userId: number
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokensCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.', description: 'refresh токен' })
    @Column({ type: DataType.TEXT, allowNull: false })
    refresh: string

    @ForeignKey(() => User)
    @ApiProperty({ example: 1, description: 'id пользователя' })
    @Column({ type: DataType.INTEGER, unique: true })
    userId: number
}