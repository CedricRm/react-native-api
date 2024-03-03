import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  providers: [MaterialService],
  controllers: [MaterialController],
})
export class MaterialModule {}
