import { Body, Controller, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';

@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService) { }

    @Post()
    create(@Body() dto: AddProductDto) {
        return this.basketService.addProduct(dto)
    }
}
