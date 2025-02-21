import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarCategoriaDto } from './dtos/atualizarCategoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService
    ){}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{
        const { categoria } = criarCategoriaDto

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já existe!`)
        }
        
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save()
    }

    async consultarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().populate("jogadores").exec()
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não cadastrada!`)
        }

        return categoriaEncontrada
    }

    async atualizaCategoria(categoria: string , atualizarCategoria: AtualizarCategoriaDto): Promise<Categoria>{

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não cadastrada!`)
        }

        return await this.categoriaModel.findOneAndUpdate({categoria}, {$set: atualizarCategoria}).exec()
    }

    async atribuirJogadorCategoria(params: string[]): Promise<void> {
         const categoria = params['categoria']
         const idJogador = params['idJogador']

         const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
         const jogadorJaCadastradoCategoria = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec()

         if (jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`O Jogador ${idJogador} já está cadastrado na Categoria ${categoria}`)
         }
         
         await this.jogadoresService.consultarJogadorPeloId(idJogador)

         if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não cadastrada!`)
        }


        categoriaEncontrada.jogadores.push(idJogador)

        await this.categoriaModel.findOneAndUpdate({categoria}, {$set:categoriaEncontrada})

    }

    
}
