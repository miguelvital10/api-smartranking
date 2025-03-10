import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:aZoazPdqYzgCVyjC@cluster0.d8wok.mongodb.net/smartranking?retryWrites=true&w=majority'),
    JogadoresModule,
    DesafiosModule,
    CategoriasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
