import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-сategories.dto';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private categoriesRepository: typeof Category) { }

    async createCategory(dto: CreateCategoryDto) {
        const category = await this.categoriesRepository.create(dto)
        return category
    }
    async getAllCategories() {
        const categories = await this.categoriesRepository.findAll()
        return categories
    }
    async deleteCategoriesById(id: number) {
        const category = await this.categoriesRepository.findByPk(id)
        category.destroy()
        return category
    }
}
