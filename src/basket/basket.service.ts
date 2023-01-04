import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './basket.model';
import { AddProductDto } from './dto/add-product.dto';
import { CreateBasketDto } from './dto/create-basket.dto';

@Injectable()
export class BasketService {
    constructor(@InjectModel(Basket) private basketRepository: typeof Basket) { }

    async createBasket(dto: CreateBasketDto) {
        const basket = await this.basketRepository.create(dto)
        return basket
    }

    async addProduct(dto: AddProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId)
        console.log(basket)
        if (dto.productId && basket) {
            await basket.$add('products', [dto.productId])
            const basketnew = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
            return basketnew
        }

    }
}
