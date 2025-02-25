import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('api/v1/desafios')
export class DesafiosController {
    constructor(private readonly desafioService: DesafiosService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        return await this.desafioService.criarDesafio(criarDesafioDto)
    }

    @Get()
    async consultarTodosDesafios(): Promise<Desafio[]> {
        return await this.desafioService.consultarTodosDesafios()
    }

    @Get('/:desafio')
    async consultarCategoriaPeloId(@Param('desafio') desafio: string): Promise<Desafio> {
        return await this.desafioService.consultarDesafioPeloId(desafio)
    }
}
