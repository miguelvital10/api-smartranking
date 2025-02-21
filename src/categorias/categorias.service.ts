import { BadRequestException, Injectable } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
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
        return await this.categoriaModel.find().exec()
    }

    
}
