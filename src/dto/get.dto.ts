import { IsNumber, IsString } from 'class-validator';

export class getDto {
  @IsString()
  code: string;

  // @IsString()
  createDate: any;

  @IsString()
  client: string;

  @IsString()
  name: string;

  @IsString()
  stage: string;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;
}
