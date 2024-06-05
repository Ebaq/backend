import { IsDate, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  'Код': string;

  @IsDate()
  @Column()
  'ДатаСоздания': Date;

  @IsString()
  @Column()
  'Клиент': string;

  @IsString()
  @Column()
  'Наименование': string;

  @IsString()
  @Column()
  'Стадия': string;

  @IsNumber()
  @Column()
  'Сумма': number;

  @IsString()
  @Column()
  'Валюта': string;
}
