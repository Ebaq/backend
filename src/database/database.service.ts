import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDto } from 'src/dto/create.dto';
import { Repository } from 'typeorm';
import { Deal } from './deal.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
  ) {}

  async createDeal(deals: createDto[]): Promise<Deal[]> {
    return await this.dealRepository.save(deals);
  }

  findOne(Code: Deal): Promise<Deal | null> {
    return this.dealRepository.findOneBy({
      Код: Code['Код'],
    });
  }

  findAllDeals(): Promise<Deal[]> {
    return this.dealRepository.find();
  }
}
