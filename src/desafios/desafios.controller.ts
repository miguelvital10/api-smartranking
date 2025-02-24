import { Controller } from '@nestjs/common';
import { DesafiosService } from './desafios.service';

@Controller('desafios')
export class DesafiosController {
    constructor(private readonly desafioService: DesafiosService) {}
}
