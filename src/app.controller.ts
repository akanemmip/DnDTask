import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/films')
  async allFilms(@Query() query?) {
    return this.service.getAll('films', query);
  }

  @Get('/films/:id')
  async oneFilm(@Param('id') id: number) {
    return this.service.getOne('films', id);
  }

  @Get('/species')
  async allSpecies(@Query() query?) {
    return this.service.getAll('species', query);
  }
  @Get('/species/:id')
  async oneSpiece(@Param('id') id: number) {
    return this.service.getOne('species', id);
  }

  @Get('/vehicles')
  async allVehicles(@Query() query?) {
    return this.service.getAll('vehicles', query);
  }
  @Get('/vehicles/:id')
  async oneVehicle(@Param('id') id: number) {
    return this.service.getOne('vehicles', id);
  }

  @Get('/starships')
  async allStarships(@Query() query?) {
    return this.service.getAll('starships', query);
  }

  @Get('/starships/:id')
  async oneStarship(@Param('id') id: number) {
    return this.service.getOne('starships', id);
  }

  @Get('/planets')
  async allPlanets(@Query() query?) {
    return this.service.getAll('planets', query);
  }

  @Get('/planets/:id')
  async onePlanet(@Param('id') id: number) {
    return this.service.getOne('planets', id);
  }
}
