import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateCategoryDto } from './dto/create-сategories.dto';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) { }

    @ApiOperation({ summary: 'Создание категории' })
    @ApiResponse({ status: 200, type: Category })
    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.createCategory(dto)
    }

    @ApiOperation({ summary: 'Получение всех категорий' })
    @ApiResponse({ status: 200, type: [Category] })
    @Get()
    getAllCategories() {
        return this.categoriesService.getAllCategories()
    }

    @ApiOperation({ summary: 'Удаление категории по ID' })
    @ApiResponse({ status: 200, type: Category })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteById(@Param('id') id: number) {
        return this.categoriesService.deleteCategoriesById(id)
    }

}
