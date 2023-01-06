import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { async } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { Basket } from './basket.model';
import { AddProductDto } from './dto/add-product.dto';
import { CreateBasketDto } from './dto/create-basket.dto';
import { RemoveAllProductDto } from './dto/remove-all-product.dto';
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

    async removeProductFromBasket(dto: RemoveProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId)
        const product = await this.productService.getProductById(dto.productId)
        if (basket && product) {
            await basket.$remove('products', product.id)
            return basket
        }
    }
    async removeAllProductFromBasket(dto: RemoveAllProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
        if (basket) {
            if (basket.products) {
                basket.products.forEach(async (product) =>
                    await basket.$remove('products', product.id)
                )
            }
            const basketnew = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
            return basketnew
        }
    }
}
