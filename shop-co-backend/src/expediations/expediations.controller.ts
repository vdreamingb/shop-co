import { Controller } from '@nestjs/common';
import { ExpediationsService } from './expediations.service';

@Controller('expediations')
export class ExpediationsController {
  constructor(private readonly expediationsService: ExpediationsService) {}
}
