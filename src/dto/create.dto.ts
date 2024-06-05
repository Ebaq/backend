import { IsDate, IsNumber, IsString } from 'class-validator';

export class createDto {
  @IsString()
  'Код': string;

  @IsDate()
  'ДатаСоздания': Date;

  @IsString()
  'Клиент': string;

  @IsString()
  'Наименование': string;

  @IsString()
  'Стадия': string;

  @IsNumber()
  'Сумма': number;

  @IsString()
  'Валюта': string;
}
