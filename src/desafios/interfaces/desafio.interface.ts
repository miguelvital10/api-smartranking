import { Document } from "mongoose";
import { Jogador } from "src/jogadores/jogador/jogador.interface";


export interface Desafio extends Document{
    readonly desafio: string,
    data: Date,
    jogadores: Array<Jogador>,
    resultado: Array<string>,
}