import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:aZoazPdqYzgCVyjC@cluster0.d8wok.mongodb.net/smartranking?retryWrites=true&w=majority'),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
