import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/products/products.model';
import { ProductsService } from 'src/products/products.service';
import { Basket } from './basket.model';
import { AddProductDto } from './dto/add-product.dto';
import { CreateBasketDto } from './dto/create-basket.dto';

@Injectable()
export class BasketService {
    constructor(@InjectModel(Basket) private basketRepository: typeof Basket,
        private productService: ProductsService) { }

    async createBasket(dto: CreateBasketDto) {
        const basket = await this.basketRepository.create(dto)
        return basket
    }

    async addProductToBasket(dto: AddProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId)
        const product = await this.productService.getProductById(dto.productId)
        console.log(basket)
        if (product && basket) {
            basket.products.push(product)
            const basketnew = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
            return basketnew
        }

    }
}
