import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { DatabaseService } from './database/database.service';
import { getDto } from './dto/get.dto';
import { MailSenderService } from './mail-sender/mail-sender.service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
    private readonly mailSenderService: MailSenderService,
  ) {}

  findAll(): any {
    const res = this.httpService.axiosRef.get(
      'https://app-396711.1cmycloud.com/applications/Demo-dev/api/deals',
    );
    return res;
  }

  async getAllAndConvert(): Promise<getDto[]> {
    const temp = await this.databaseService.findAllDeals();
    let res: getDto[] = [];
    for (let i = 0; i < temp.length; i++) {
      res.push({
        code: temp[i]['Код'],
        createDate: moment(temp[i]['ДатаСоздания']).format('DD/MM/YYYYTHH:mm'),
        client: temp[i]['Клиент'],
        name: temp[i]['Наименование'],
        stage: temp[i]['Стадия'],
        price: temp[i]['Сумма'],
        currency: temp[i]['Валюта'],
      });
    }
    res = res.sort((a, b) =>
      moment(a.createDate, 'DD/MM/YYYYTHH:mm') <
      moment(b.createDate, 'DD/MM/YYYYTHH:mm')
        ? 1
        : -1,
    );
    return res;
  }

  async computeStatsAndSend() {
    let temp: getDto[] = await this.getAllAndConvert();
    let sum: number = 0;
    let count: number = temp.length;
    temp.forEach((el) => (sum += el.price));
    let top3 = temp.sort((a, b) => (a.price < b.price ? 1 : -1)).slice(0, 3);
    await this.mailSenderService.sendMail(top3, count, sum);
  }
}
