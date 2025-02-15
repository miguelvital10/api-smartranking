import { IsEmail, IsNotEmpty } from 'class-validator';
export class CriarJogadorDto {
    
    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsNotEmpty()
    readonly nome: string;
}