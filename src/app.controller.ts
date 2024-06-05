import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { Deal } from './database/deal.entity';
import { createDto } from './dto/create.dto';

@Controller('api/v1/deals')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get('all-deals')
  getDeals(): Promise<Deal[]> {
    return this.databaseService.findAllDeals();
  }

  @UsePipes(new ValidationPipe())
  @Post('create-deal')
  createDeals(@Body() deals: createDto[]) {
    // if (!deals) {
    //   throw new BadRequestException('Запрос должен содержать body');
    // }
    const res = this.databaseService.createDeal(deals);
    return res;
  }
}
