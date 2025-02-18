import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './jogador/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criaJogadorDto
        // const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com email ${email} já cadastrado!`)
        }
        
        const jogadorCriado = new this.jogadorModel(criaJogadorDto)
        return await jogadorCriado.save()
    }


    async atualizarJogador(_id: string, criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (!jogadorEncontrado) {
            throw new BadRequestException(`Jogador com id ${_id} não encontrado!`)
        }
        
        return await this.jogadorModel.findOneAndUpdate({_id}, {$set: criaJogadorDto}).exec()
    }


    async consultarTodosJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec()
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
        
        return jogadorEncontrado
    }

    async deletarJogador(_id: string): Promise<any> {
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec()

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
        

        return await this.jogadorModel.deleteOne({ _id }).exec()
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, 
            {$set: criarJogadorDto}).exec()
    
    }
    

}
