import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { PartidaSchema } from './interfaces/partida.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema}]),
  JogadoresModule,
  MongooseModule.forFeature([{ name: 'Partida', schema: PartidaSchema}])
],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
