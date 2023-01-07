import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BasketService } from 'src/basket/basket.service';
import { Product } from 'src/products/products.model';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';
export interface getOrderItemsResult {
    orderId: number,
    userId: number,
    address: string
    products: {
        orderId: number
        productId: number;
        productName: string;
        price: number;
        quantity: number;
        imagejpg: string
        imagewebp: string
    }[]
}

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
        private basketService: BasketService,
        private productsService: ProductsService) { }

    async getOrderByPk(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId, { include: { all: true } })
        return order
    }

    async createOrder(dto: CreateOrderDto) {
        const basket = await this.basketService.getBasketItems(dto.basketId)
        const order = await this.orderRepository.create({ ...dto, userId: basket.userId })
        if (basket.products && order) {
            await basket.products.forEach(async (item) => {
                const product = await this.productsService.getProductById(item.productId)
                product.quantity -= item.quantity
                await product.save()
                await order.$add('products', item.productId, { through: { quantity: item.quantity } })
            })
            await this.basketService.removeAllProductFromBasket({ basketId: basket.basketId })
            return order
        }
    }

    async deleteOrderById(id: number) {
        const order = await this.orderRepository.findByPk(id)
        if (order) {
            await order.destroy()
            return order
        }

    }

    async getOrderItems(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            include: [{
                model: Product,
                through: {
                    attributes: ['quantity'],
                },
            }],
        });

        const result: getOrderItemsResult = {
            address: order.address,
            orderId: order.id,
            userId: order.userId,
            products: []
        } as getOrderItemsResult

        for (const product of order.products) {
            const orderProduct = product.get('OrderProduct') as { quantity: number }
            result.products.push({
                orderId: order.id,
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: orderProduct.quantity,
                imagejpg: product.imagejpg,
                imagewebp: product.imagewebp
            });
        }
        return result
    }
}
