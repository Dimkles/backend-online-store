import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
import { RemoveAllProductDto } from './dto/remove-all-product.dto';
import { RemoveProductDto } from './dto/remove-product.dto';

@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService) { }

    @Post()
    addProduct(@Body() dto: AddProductDto) {
        return this.basketService.addProductToBasket(dto)
    }
    @Delete()
    removeProduct(@Body() dto: RemoveProductDto) {
        return this.basketService.removeProductFromBasket(dto)
    }
    @Delete('/all')
    removeAllProduct(@Body() dto: RemoveAllProductDto) {
        return this.basketService.removeAllProductFromBasket(dto)
    }
    @Get('/:id')
    getBasketItems(@Param('id') id: number) {
        return this.basketService.getBasketItems(id)
    }

}
