import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
const webp = require('webp-converter');

@Injectable()
export class FilesService {
    async createFile(file): Promise<{ imagejpg: string, imagewebp: string }> {
        try {
            const fileName = uuid.v4()
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName + '.jpg'), file.buffer)
            webp.grant_permission();
            await webp.cwebp(`${filePath}/${fileName + '.jpg'}`, `${filePath}/${fileName + '.webp'}`, "-q 80");
            const imagesName = {
                imagejpg: `${fileName}.jpg`,
                imagewebp: `${fileName}.webp`
            }
            return imagesName
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(fileName) {
        try {
            const filePath = path.resolve(__dirname, '..', `static/${fileName}`)
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
