import { Controller, ParseIntPipe, Post, Param, Body } from '@nestjs/common';
import { DetailsService } from './details.service';
import { createDetailsDto } from './dto/createDetails.dto';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {
  }
  @Post('create')
    async createDetails(@Body() body:createDetailsDto){
      return this.detailsService.createDetails(body)
    }
}
