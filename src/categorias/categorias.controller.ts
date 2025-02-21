import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';
import { CategoriasValiacaoParametrosPipe } from './pipes/categorias-validacao-parametros.pipe';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriaService: CategoriasService ){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{
        return await this.categoriaService.criarCategoria(criarCategoriaDto)
    }


    @Get()
    async consultarTodasCategorias(): Promise<Categoria[]>{
        return await this.categoriaService.consultarTodasCategorias()
    }

    @Get('/:categoria')
    async consultarCategoriaPeloId(@Param('categoria', CategoriasValiacaoParametrosPipe) categoria: string): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaPeloId(categoria)
    }
}
