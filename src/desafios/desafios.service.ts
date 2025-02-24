import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafio } from './interfaces/desafio.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class DesafiosService {
   constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService
   ){}
}
