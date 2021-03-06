import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from './cache.service';

@ApiTags('cache')
@Controller('cache')
export class CacheController {
  constructor(private readonly service: CacheService) {}
  @Get()
  getAll() {
    return this.service.getAll();
  }
}
