import { Module } from '@nestjs/common';
import { Mongoose } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { JogadoresController } from './jogadores/jogadores.controller';
import { JogadoresService } from './jogadores/jogadores.service';

@Module({
  imports: [JogadoresModule],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class AppModule {}
