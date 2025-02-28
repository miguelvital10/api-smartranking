import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio, Partida } from './interfaces/desafio.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';

@Injectable()
export class DesafiosService {
   constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService){}

    private readonly logger = new Logger(DesafiosService.name)

   async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {

    const jogadores = await this.jogadoresService.consultarTodosJogadores()

    criarDesafioDto.jogadores.map(jogadorDto => {
        const jogadorFilter = jogadores.filter( jogador => jogador._id == jogadorDto._id)

        if (jogadorFilter.length == 0) {
            throw new NotFoundException(`O id ${jogadorDto._id} não foi encontrado!`)
        }
    })  

    const solicitanteEhJogadorDaPartida = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante)

    if (solicitanteEhJogadorDaPartida.length == 0){
        throw new BadRequestException(`O Solicitante ${criarDesafioDto.solicitante} não é um jogador da partida!`)
    }

    const categoriaDoJogador = await this.categoriasService.consultarCategoriaDoJogador(criarDesafioDto.solicitante)

    if (!categoriaDoJogador) {
        throw new BadRequestException('O solicitante precisa estar vinculado a uma categoria')
    }

    const desafioCriado = new this.desafioModel(criarDesafioDto)
    desafioCriado.categoria = categoriaDoJogador.categoria
    desafioCriado.dataHoraSolicitacao = new Date()

    desafioCriado.status = DesafioStatus.PENDENTE
    this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`)

    return await desafioCriado.save()
    
   }

   async consultarTodosDesafios(): Promise<Desafio[]> {
    return await this.desafioModel.find()
    .populate("solicitante")
    .populate("jogadores")
    .populate("partidas")
    .exec()
   }

   async consultarDesafiosDeUmJogador(_id: any): Promise<Desafio[]> {
        const jogadores = await this.jogadoresService.consultarTodosJogadores()

        const jogadorFilter = jogadores.filter( jogador => jogador._id == _id)

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${_id} não é um jogador!`)
        }
 
        return await this.desafioModel.find()
        .where('jogadores')
        .in(_id)
        .populate('soliciante')
        .populate('jogadores')
        .populate('partida')
        .exec()
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

        if (atualizarDesafioDto.status) {
            desafioEncontrado.dataHoraResposta = new Date()
        }

        desafioEncontrado.status = atualizarDesafioDto.status
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio

        return await this.desafioModel.findOneAndUpdate({ desafio }, {$set: desafioEncontrado}).exec()

    }

    async atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto ): Promise<void> {

        const desafioEncontrado = await this.desafioModel.findById(_id).exec()
        
        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado!`)
        }

       const jogadorFilter = desafioEncontrado.jogadores.filter( jogador => jogador._id == atribuirDesafioPartidaDto.def )

        this.logger.log(`desafioEncontrado: ${desafioEncontrado}`)
        this.logger.log(`jogadorFilter: ${jogadorFilter}`)

       if (jogadorFilter.length == 0) {
           throw new BadRequestException(`O jogador vencedor não faz parte do desafio!`)
       }

       const partidaCriada = new this.partidaModel(atribuirDesafioPartidaDto)

      
       partidaCriada.categoria = desafioEncontrado.categoria

       
       partidaCriada.jogadores = desafioEncontrado.jogadores

       const resultado = await partidaCriada.save()
       
        desafioEncontrado.status = DesafioStatus.REALIZADO

        desafioEncontrado.partida = resultado._id as string

        

        try {
        await this.desafioModel.findOneAndUpdate({_id},{$set: desafioEncontrado}).exec() 
        } catch (error) {
           await this.partidaModel.deleteOne({_id: resultado._id}).exec();
           throw new InternalServerErrorException(`error: ${error}`)
        }
    }


    async deletarDesafio(_id: string): Promise<void> {
        const desafioEncontrado = await this.desafioModel.findOne({ _id }).exec()

        if (!desafioEncontrado) {
            throw new NotFoundException(`Desafio ${_id} não encontrado!`)
        }

        desafioEncontrado.status = DesafioStatus.CANCELADO

         await this.desafioModel.findOneAndUpdate({_id}, {$set: desafioEncontrado})
    }
}
