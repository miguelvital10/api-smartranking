import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './jogador/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly JogadoresService: JogadoresService) {}
  
  @Post()
  async criarAtualizarJogador(   
    @Body() criaJogadorDto: CriarJogadorDto) {
      await this.JogadoresService.criarAtualizarJogador(criaJogadorDto)
    }

  @Get()
  async consultarJogadores(@Query('email') email: string): Promise<Jogador | Jogador[]> {
    if (email) {
      return await this.JogadoresService.consultarJogadoresByEmail(email)
    } else {
      return await this.JogadoresService.consultarTodosJogadores()
    }
  }
}