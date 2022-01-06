import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';

@Module({
  providers: [CacheService, PrismaService],
  exports: [CacheService],
  controllers: [CacheController],
})
export class CacheModule {}
