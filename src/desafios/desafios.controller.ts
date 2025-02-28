import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
    constructor(private readonly desafioService: DesafiosService) {}

    private readonly logger = new Logger(DesafiosController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)
        return await this.desafioService.criarDesafio(criarDesafioDto)
    }

    @Get()
    async consultarDesafios(@Query('idJogador') _id: string): Promise<Desafio[]> {
        return _id ? await this.desafioService.consultarDesafiosDeUmJogador(_id)
        : await this.desafioService.consultarTodosDesafios()
    }

    @Put('/:desafio')
    async atualizarDesafio(@Body(DesafioStatusValidacaoPipe) atualizaDesafio: AtualizarDesafioDto, @Param('desafio') _id: string): Promise<void> {
         await this.desafioService.atualizaDesafio(_id, atualizaDesafio)
    }


   @Post('/:desafio/partida/')
   async atribuirDesafioPartida(
       @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
       @Param('desafio') _id: string): Promise<void> {
        return await this.desafioService.atribuirDesafioPartida(_id, atribuirDesafioPartidaDto)           
   }


    @Delete('/:_id')
    async DeletarDesafio(@Query('_id') _id: string): Promise<void> {
        await this.desafioService.deletarDesafio(_id)
    }
}
