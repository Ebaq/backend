import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { getDto } from 'src/dto/get.dto';

@Injectable()
export class MailSenderService {
  constructor(private mailerService: MailerService) {}

  async sendMail(deals: getDto[], count: number, total: number) {
    await this.mailerService.sendMail({
      from: 'Мартиросов Артем',
      to: 'dmitrb@rarus.ru',
      subject: 'Задание',
      template: './mail/templates/mail',
      context: {
        data: deals,
        count,
        total,
      },
    });
  }
}
