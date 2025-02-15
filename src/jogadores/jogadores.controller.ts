import { Body, Controller, Post, Get, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './jogador/jogador.interface';
import { JogdoresValiacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly JogadoresService: JogadoresService) {}
  
  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(   
    @Body() criaJogadorDto: CriarJogadorDto) {
      await this.JogadoresService.criarAtualizarJogador(criaJogadorDto)
    }

  @Get()
  async consultarJogadores(@Query('email', JogdoresValiacaoParametrosPipe) email: string): Promise<Jogador | Jogador[]> {
    if (email) {
      return await this.JogadoresService.consultarJogadoresByEmail(email)
    } else {
      return await this.JogadoresService.consultarTodosJogadores()
    }
  }

  @Delete()
  async deletarJogador(@Query('email', JogdoresValiacaoParametrosPipe) email: string): Promise<void> {
    await this.JogadoresService.deletarJogador(email)
  }
}