import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/categoria.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema}])],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
