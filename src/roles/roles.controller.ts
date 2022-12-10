import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @ApiOperation({ summary: 'Создание роли' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({ summary: 'Получение роли по названию' })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
