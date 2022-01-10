import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCacheDto } from './dto/create-cache.dto';

@Injectable()
export class CacheService {
  private ONE_DAY_MS = new Date(new Date().valueOf() - 24 * 3600 * 1000);

  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    this.updateDB();
    const data = await this.prisma.cache.findMany();
    return { count: data.length, data };
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
          lte: this.ONE_DAY_MS,
        },
      },
    });
  }
}
