import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product) private productsRepositiry: typeof Product, private fileService: FilesService) { }

    async getAllProducts() {
        const products = await this.productsRepositiry.findAll({ include: { all: true } })
        return products
    }

    async getProductById(id: number) {
        const product = await this.productsRepositiry.findByPk(id, { include: { all: true } })
        return product
    }

    async createProduct(dto: CreateProductsDto, image: File) {
        const { imagejpg, imagewebp } = await this.fileService.createFile(image)
        const product = await this.productsRepositiry.create({ ...dto, imagewebp, imagejpg })
        if (typeof dto.categories === 'string') {
            const categories = dto.categories.split(',')
            categories.map(async (category) => {
                await product.$add('categories', +category)
            })
        } else {
            dto.categories.map(async (category) => {
                await product.$add('categories', category)
            })
        }
        return product
    }

    async updateProductById(dto: UpdateProductsDto, id: number, image: any) {
        console.log(id)
        const product = await this.productsRepositiry.findByPk(id, { include: { all: true } })
        const fileName = await this.fileService.createFile(image)
        await this.fileService.deleteFile(product.imagejpg)
        await this.fileService.deleteFile(product.imagewebp)
        product.imagejpg = fileName.imagejpg
        product.imagewebp = fileName.imagewebp
        product.name = dto.name
        product.price = dto.price
        product.description = dto.description
        product.$remove('categories', product.categories.map((category) => category.id))
        if (typeof dto.categories === 'string') {
            const categories = dto.categories.split(',')
            categories.map(async (category) => {
                await product.$add('categories', +category)
            })
        } else {
            dto.categories.map(async (category) => {
                await product.$add('categories', category)
            })
        }
        await product.save()
        const updateProduct = await this.productsRepositiry.findByPk(id, { include: { all: true } })
        return updateProduct
    }

    async deleteProductById(id: number) {
        const product = await this.productsRepositiry.findByPk(id, { include: { all: true } })
        await this.fileService.deleteFile(product.imagejpg)
        await this.fileService.deleteFile(product.imagewebp)
        product.destroy()
        return product
    }
}
