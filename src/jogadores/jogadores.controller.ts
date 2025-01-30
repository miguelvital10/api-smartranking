import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly JogadoresService: JogadoresService) {}
  
  @Post()
  async criarAtualizarJogador(      
    @Body() criaJogadorDto: CriarJogadorDto) {
      await this.JogadoresService.criarAtualizarJogador(criaJogadorDto)
    }
}