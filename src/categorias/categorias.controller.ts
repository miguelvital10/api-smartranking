import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarCategoriaDto } from './dtos/criarCategoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasService } from './categorias.service';

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
    async consultarCategoriaPeloId(@Param('categoria') categoria: string): Promise<Categoria>{
        return await this.categoriaService.consultarCategoriaPeloId(categoria)
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto, @Param('categoria') categoria: string): Promise<Categoria> {
       return await this.categoriaService.atualizaCategoria(categoria, atualizarCategoriaDto)
    }

    @Post('/:categoria/jogadores/:idJogador')
    @UsePipes(ValidationPipe)
    async atribuirJogadorCategoria(@Param() params: string[]): Promise<void> {
        return await this.categoriaService.atribuirJogadorCategoria(params)
    }
}
