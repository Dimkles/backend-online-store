import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Product } from './products.model';
import { ProductsService } from './products.service';


@ApiTags('Товары')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @ApiOperation({ summary: 'Создание товара' })
    @ApiResponse({ status: 200, type: Product })
    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateProductsDto, @UploadedFile() image) {
        return this.productsService.createProduct(dto, image)
    }

    @ApiOperation({ summary: 'Получение всех товаров' })
    // @ApiResponse({ status: 200, type: [Product] })
    @Get()
    getAllProduct(@Query('page') page = 1, @Query('limit') limit = 10) {
        return this.productsService.getAllProducts(page, limit)
    }

    @ApiOperation({ summary: 'Получение одного товара по ID' })
    @ApiResponse({ status: 200, type: Product })
    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.productsService.getProductById(id)
    }

    @ApiOperation({ summary: 'Обновление товара по ID' })
    @ApiResponse({ status: 200, type: Product })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    @UseInterceptors(FileInterceptor('image'))
    updateProduct(@Param('id') id: number, @Body() dto: UpdateProductsDto, @UploadedFile() image) {
        return this.productsService.updateProductById(dto, id, image)
    }

    @ApiOperation({ summary: 'Удаление товара по ID' })
    @ApiResponse({ status: 200, type: Product })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteProductById(@Param('id') id: number) {
        return this.productsService.deleteProductById(id)
    }
}
