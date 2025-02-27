import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import * as momentTimezone from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter())

  Date.prototype.toJSON = function(): any {
    return momentTimezone(this)
    .tz('America/Sao_Paulo')
    .format('YYYY-MM-DD HH:mm:ss.SSS')
  }
  await app.listen(process.env.PORT ?? 8083);
}
bootstrap();
