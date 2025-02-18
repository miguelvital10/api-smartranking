import { Body, Controller, Post, Get, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './jogador/jogador.interface';
import { JogdoresValiacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizarJogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly JogadoresService: JogadoresService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(   
    @Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
      return await this.JogadoresService.criarJogador(criaJogadorDto)
    }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogador: AtualizarJogadorDto,
    @Param('_id', JogdoresValiacaoParametrosPipe) _id: string): Promise<void> {
      await this.JogadoresService.atualizarJogador(_id, atualizarJogador,)
    }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
      return await this.JogadoresService.consultarTodosJogadores()
    }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', JogdoresValiacaoParametrosPipe) _id: string): Promise<Jogador> {
      return await this.JogadoresService.consultarJogadorPeloId(_id)
  }

  @Delete('/:_id')
  async deletarJogador(@Param('_id', JogdoresValiacaoParametrosPipe) _id: string): Promise<void> {
    await this.JogadoresService.deletarJogador(_id)
  }
}