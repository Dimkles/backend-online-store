import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { Basket } from './basket.model';
import { AddProductDto } from './dto/add-product.dto';
import { CreateBasketDto } from './dto/create-basket.dto';
import { RemoveProductDto } from './dto/remove-product.dto';

@Injectable()
export class BasketService {
    constructor(@InjectModel(Basket) private basketRepository: typeof Basket,
        private productService: ProductsService) { }

    async createBasket(dto: CreateBasketDto) {
        const basket = await this.basketRepository.create(dto)
        return basket
    }

    async addProductToBasket(dto: AddProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
        const product = await this.productService.getProductById(dto.productId)
        if (product && basket) {

            await basket.$add('products', product, { through: { quantity: dto.quantity } });
            const basketnew = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
            return basketnew
        }
    }

    async removeProductToBasket(dto: RemoveProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId)
        const product = await this.productService.getProductById(dto.productId)
        if (basket && product) {
            const productIndex = basket.products.indexOf(product)
            if (productIndex >= 0) {
                basket.products.splice(productIndex, 1)
                await basket.save()
                return basket
            }
        }
    }
    async removeAllProductToBasket(basketId: number) {
        const basket = await this.basketRepository.findByPk(basketId)
        if (basket) {
            basket.products.length = 0
            await basket.save()
            return basket
        }
    }
}
