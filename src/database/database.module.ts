import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { Deal } from './deal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deal])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
