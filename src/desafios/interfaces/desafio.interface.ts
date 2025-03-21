import { Document } from "mongoose";
import { Jogador } from "src/jogadores/jogador/jogador.interface";
import { DesafioStatus } from "./desafio-status.enum";

export interface Desafio extends Document {

    dataHoraDesafio: Date
    status: DesafioStatus
    dataHoraSolicitacao: Date
    dataHoraResposta: Date
    solicitante: Jogador
    categoria: string
    jogadores: Array<Jogador>
    partida: string | Partida  
}

export interface Partida extends Document{
    categoria: string
    jogadores: Array<Jogador>
    def: Jogador
    resultado: Array<Resultado>  
}

export interface Resultado {
    set: string
}
