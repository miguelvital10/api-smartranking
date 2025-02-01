import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './jogador/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []   

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
        await this.criar(criaJogadorDto)
    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadores
    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, email, telefoneCelular} = criaJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }

        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)

        this.jogadores.push(jogador)
    }

}
