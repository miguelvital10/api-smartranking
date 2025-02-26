import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio } from './interfaces/desafio.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';

@Injectable()
export class DesafiosService {
   constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService
   ){}

   private readonly (categoriasService: CategoriasService) {}
   
   private readonly logger = new Logger(DesafiosService.name)

   async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {

    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    criarDesafioDto.jogadores.map(jogadorDto => {
        const jogadorFilter = jogadores.filter( jogador => jogador._id == jogadorDto._id)

        if (jogadorFilter.length == 0) {
            throw new NotFoundException(`O id ${jogadorDto._id} não foi encontrado!`)
        }
    })

    const desafioCriado = new this.desafioModel(criarDesafioDto)

    return await desafioCriado.save()
   }

   async consultarTodosDesafios(): Promise<Desafio[]> {
        return await this.desafioModel.find().populate("jogadores").exec()
   }

   async consultarDesafioPeloId(desafio: string): Promise<Desafio> {
    
        const desafioEncontrado = await this.desafioModel.findOne({ desafio }).populate("jogadores").exec()
        
        if (!desafioEncontrado) {
            throw new NotFoundException(`Desafio ${desafio} não encontrado`)
        }

        return desafioEncontrado
    }

    async atualizaDesafio(desafio: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<Desafio> {
        const desafioEncontrado = await this.desafioModel.findOne({ desafio }).populate("jogadores").exec()

        if (!desafioEncontrado) {
            throw new NotFoundException(`Desafio ${desafio} não encontrado!`)
        }

        return await this.desafioModel.findOneAndUpdate({ desafio }, {$set: atualizarDesafioDto}).exec()

    }
}
