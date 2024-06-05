import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { Deal } from './database/deal.entity';
import { MailModule } from './mail-sender/mail-sender.module';
import { MailSenderService } from './mail-sender/mail-sender.service';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    MailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'StudyUser',
      password: 'Study',
      database: 'Study',
      entities: [Deal],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailSenderService],
})
export class AppModule {}
