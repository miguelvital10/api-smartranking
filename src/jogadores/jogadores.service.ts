import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './jogador/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []   

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criaJogadorDto
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if (jogadorEncontrado) {
            await this.atualizar(jogadorEncontrado, criaJogadorDto)
        } else {
            await this.criar(criaJogadorDto)
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadores
    }

    async consultarJogadoresByEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        
        return jogadorEncontrado
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

    private atualizar(jogadorEncontrado: Jogador, criaJogadorDto: CriarJogadorDto): void {
        const { nome } = criaJogadorDto

        jogadorEncontrado.nome = nome
    }

}
