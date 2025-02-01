import { Body, Controller, Post, Get } from '@nestjs/common';
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
  async consultarJogadores(): Promise<Jogador[]> {
    return this.JogadoresService.consultarTodosJogadores()
  }
}