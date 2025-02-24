import mongoose from "mongoose";

export const DesafioSchema = new mongoose.Schema({
    desafio: {type: String},
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jogador"
    }],
    resultado: {type: Array}
}, {timestamps: true, collection: 'desafios'})