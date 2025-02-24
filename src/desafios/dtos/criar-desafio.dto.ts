import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Jogador } from "src/jogadores/jogador/jogador.interface";

export class CriarDesafioDto{
    
        @IsString()
        @IsNotEmpty()
        readonly desafio: string;
    
        @IsDate()
        @IsNotEmpty()
        data: Date;
    
        @IsArray()
        @ArrayMinSize(2)
        @ArrayMaxSize(4)
        eventos: Array<Jogador>
}