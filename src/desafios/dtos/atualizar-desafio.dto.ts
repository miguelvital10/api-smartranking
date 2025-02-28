import { IsDateString, IsOptional } from "class-validator";
import { DesafioStatus } from "../interfaces/desafio-status.enum";

export class AtualizarDesafioDto{
    
        @IsOptional()
        @IsDateString()
        dataHoraDesafio: Date;
    
        @IsOptional()
        status: DesafioStatus;
}