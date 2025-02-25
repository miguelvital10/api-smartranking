import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString } from "class-validator";
import { Jogador } from "src/jogadores/jogador/jogador.interface";

export class AtualizarDesafioDto{
    
        @IsDateString()
        data: Date;
    
        @IsArray()
        @ArrayMinSize(2)
        @ArrayMaxSize(4)
        jogadores: Array<Jogador>
}