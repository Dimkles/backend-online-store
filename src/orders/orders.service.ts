import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { BasketService } from 'src/basket/basket.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';

@Injectable()
export class OrdersService {

    constructor(@InjectModel(Order) private orderRepository: typeof Order,
        private basketService: BasketService) { }

    async getOrder(orderId: number) {
        const order = await this.orderRepository.findByPk(orderId, { include: { all: true } })
        return order
    }

    async createOrder(dto: CreateOrderDto) {
        const basket = await this.basketService.getBasket(dto.basketId)
        const order = await this.orderRepository.create(dto)
        if (basket.products && order) {
            basket.products.forEach(async (product) => {
                const quantity = await this.basketService.getQuantityProduct(basket.id, product.id)
                await order.$add('products', product.id, { through: { quantity } })
            }
            )
            return this.getOrder(order.id)
        }
    }
}
