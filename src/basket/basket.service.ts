import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { ProductsService } from 'src/products/products.service';
import { BasketProduct } from './basket-product.model';
import { Basket } from './basket.model';
import { AddProductDto } from './dto/add-product.dto';
import { CreateBasketDto } from './dto/create-basket.dto';
import { RemoveAllProductDto } from './dto/remove-all-product.dto';
import { RemoveProductDto } from './dto/remove-product.dto';
export interface getBasketItemsResult {
    basketId: number,
    userId: number,
    products: {
        basketId: number
        productId: number;
        productName: string;
        price: number;
        quantity: number;
        imagejpg: string
        imagewebp: string
    }[]
}
@Injectable()
export class BasketService {
    constructor(@InjectModel(Basket) private basketRepository: typeof Basket,
        @InjectModel(BasketProduct) private basketProductsRepository: typeof BasketProduct,
        private productService: ProductsService,
        private sequelize: Sequelize) { }

    async createBasket(dto: CreateBasketDto) {
        const basket = await this.basketRepository.create(dto)
        return basket
    }

    async getBasket(basketId: number) {
        const basket = await this.basketRepository.findByPk(basketId, { include: { all: true } })

        return basket
    }

    async getQuantityProduct(basketId: number, productId: number) {
        return (await this.basketProductsRepository.findOne({ where: { basketId, productId } })).quantity
    }

    async addProductToBasket(dto: AddProductDto) {
        const basket = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
        const product = await this.productService.getProductById(dto.productId)
        if (product && basket) {
            await basket.$add('products', product, { through: { quantity: dto.quantity } });
            const basketnew = await this.getBasketItems(basket.id)
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
            if (basket.products.length) {
                basket.products.forEach(async (product) =>
                    await basket.$remove('products', product.id)
                )
            }
            const basketnew = await this.basketRepository.findByPk(dto.basketId, { include: { all: true } })
            return basketnew
        }
    }

    async getBasketItems(id: number) {
        const basket = await this.basketRepository.findOne({
            where: { id },
            include: [{
                model: Product,
                through: {
                    attributes: ['quantity'],
                },
            }],
        });

        const result: getBasketItemsResult = {

            basketId: basket.id,
            userId: basket.userId,
            products: []
        } as getBasketItemsResult

        for (const product of basket.products) {
            const basketProduct = product.get('BasketProduct') as { quantity: number }
            result.products.push({
                basketId: basket.id,
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: basketProduct.quantity,
                imagejpg: product.imagejpg,
                imagewebp: product.imagewebp
            });
        }
        return result
    }

}
