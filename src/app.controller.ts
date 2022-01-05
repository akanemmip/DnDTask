import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/films')
  async allFilms(@Query() query?) {
    return this.service.getAll('films', query);
  }

  @Get('/species')
  async allSpecies(@Query() query?) {
    return this.service.getAll('species', query);
  }

  @Get('/vehicles')
  async allVehicles(@Query() query?) {
    return this.service.getAll('vehicles', query);
  }

  @Get('/starships')
  async allStarships(@Query() query?) {
    return this.service.getAll('starships', query);
  }

  @Get('/planets')
  async allPlanets(@Query() query?) {
    return this.service.getAll('planets', query);
  }
}
