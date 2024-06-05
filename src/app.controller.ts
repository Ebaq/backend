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
import { createDto } from './dto/create.dto';
import { getDto } from './dto/get.dto';

@Controller('api/v1/deals')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get('all-deals')
  getDeals(): Promise<getDto[]> {
    return this.appService.getAllAndConvert();
  }

  @UsePipes(new ValidationPipe())
  @Post('create-deal')
  createDeals(@Body() deals: createDto[]) {
    const res = this.databaseService.createDeal(deals);
    return res;
  }

  @Post('fill-deals')
  async fillDeals() {
    const res: any = await this.appService.findAll();

    for (let i = 0; i < res.data.length; i++) {
      if (await this.databaseService.findOne(res.data[i])) {
        console.log('exist');
      } else {
        this.createDeals(res.data[i]);
      }
    }
  }

  @Post('send-email')
  async sendToTeacher() {
    await this.appService.computeStatsAndSend();
    return 'Сообщение отправлено!!';
  }
}
