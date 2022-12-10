import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import { Response, Request } from 'express'
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
@Injectable()
export class AuthService {


    constructor(private usersService: UsersService,
        private jwtService: JwtService, @InjectModel(Token) private tokenRepository: typeof Token) { }

    async login(userDto: CreateUserDto, response: Response) {
        const user = await this.validateUser(userDto)
        const { refreshToken, accessToken } = await this.generateToken(user)

        const oldToken = await this.tokenRepository.findOne({ where: { userId: user.id } })
        if (oldToken) {
            oldToken.destroy()
        }
        await this.tokenRepository.create({ refresh: refreshToken, userId: user.id })
        response.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, })
        return { token: accessToken, user: { id: user.id, email: user.email, roles: user.roles, banned: user.banned, banReason: user.banReason } }
    }

    async logout(response: Response, request: Request) {
        const refresCookiehToken = request.cookies.refreshToken
        const tokenFromDb = await this.tokenRepository.findOne({ where: { refresh: refresCookiehToken } })
        tokenFromDb.destroy()
        response.clearCookie('refreshToken')
        return tokenFromDb
    }

    async registration(userDto: CreateUserDto, response: Response) {

        const candidate = await this.usersService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword })

        const { refreshToken, accessToken } = await this.generateToken(user)
        await this.tokenRepository.create({ refresh: refreshToken, userId: user.id })
        response.cookie('refreshToken', refreshToken)
        return { token: accessToken, user: { id: user.id, email: user.email, roles: user.roles, banned: user.banned, banReason: user.banReason } }
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        const token = {
            refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
            accessToken: this.jwtService.sign(payload, { expiresIn: '15m' })
        }
        return token
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email)
        if (!user) throw new UnauthorizedException({ message: 'Некорректый email или пароль' })
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Некорректый email или пароль' })
    }

    private validateToken(token) {
        try {
            const userData = this.jwtService.verify(token)
            return userData
        } catch (error) {
            return null
        }
    }

    async refresh(response: Response, request: Request) {
        const refresCookiehToken = request.cookies.refreshToken
        if (!refresCookiehToken) {
            throw new UnauthorizedException({ message: 'Не авторизирован' })
        }
        const userData = this.validateToken(refresCookiehToken)
        const tokenFromDb = await this.tokenRepository.findOne({ where: { refresh: refresCookiehToken } })
        if (!userData || !tokenFromDb) {
            throw new UnauthorizedException({ message: 'Не авторизирован' })
        }
        const user = await this.usersService.getUserByEmail(userData.email)
        const { refreshToken, accessToken } = await this.generateToken(user)
        tokenFromDb.destroy()
        await this.tokenRepository.create({ refresh: refreshToken, userId: user.id })
        response.cookie('refreshToken', refreshToken)
        return { token: accessToken, user: { id: user.id, email: user.email, roles: user.roles, banned: user.banned, banReason: user.banReason } }

    }


}
