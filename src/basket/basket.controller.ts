import { Body, Controller, Delete, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
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

}
