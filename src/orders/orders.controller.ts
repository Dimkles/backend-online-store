import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) { }

    @Post()
    createOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(dto)
    }
    @Delete('/:id')
    deleteProductById(@Param('id') id: number) {
        return this.orderService.deleteOrderById(id)
    }

    @Get('/:id')
    getBasketItems(@Param('id') id: number) {
        return this.orderService.getOrderItems(id)
    }
}
