import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Jogador } from "src/jogadores/jogador/jogador.interface";

export class CriarDesafioDto{
    
        @IsString()
        @IsNotEmpty()
        readonly desafio: string;
    
        @IsDateString()
        @IsNotEmpty()
        data: Date;
    
        @IsArray()
        @ArrayMinSize(2)
        @ArrayMaxSize(4)
        jogadores: Array<Jogador>
}