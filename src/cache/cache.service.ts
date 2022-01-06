import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCacheDto } from './dto/create-cache.dto';

@Injectable()
export class CacheService {
  private ONE_DAY_MS = new Date().getTime() + 24 * 60 * 60 * 1000;
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.cache.findMany();
  }

  async findByRoute(route: string) {
    this.updateDB();

    const cache = await this.prisma.cache.findUnique({
      where: {
        route,
      },
    });

    return cache ? JSON.parse(cache.response) : null;
  }

  async create(data: CreateCacheDto) {
    await this.prisma.cache.create({ data });
  }

  private async updateDB() {
    await this.prisma.cache.deleteMany({
      where: {
        timestamp: {
          gte: this.ONE_DAY_MS,
        },
      },
    });
  }
}
