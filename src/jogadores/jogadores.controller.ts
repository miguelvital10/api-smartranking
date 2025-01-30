import { Body, Controller, Post } from '@nestjs/common';
import { criarJogadorDto } from './dtos/criarJogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

  @Post()
  async criarAtualizarJogador(
    
    @Body() criarJogadorDto: criarJogadorDto) {
      const { email } = criarJogadorDto
        return JSON.stringify(`{
          "email": ${email},
      }`);
    }
}