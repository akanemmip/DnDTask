import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @ApiOperation({
    description:
      'Gets from /films/ and opening_crawl property information and analyse this. Returns:' +
      '\n 1. an array of pairs of unique words from all films openings paired with their number of occurrences in the text. ' +
      '\n 2. a name of a character from the /people API that appears the most often across all of the openings of the film' +
      '\n 3. the total number of nodes if we would build a Trie',
  })
  @Get('/films/openingCrawlAnalysis')
  async openingCrawlAnalysis() {
    return await this.service.openingCrawlAnalysis();
  }

  @ApiOperation({
    description: 'Get all the film resources',
  })
  @ApiOkResponse({ status: 200, description: 'Array of films' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/films')
  async allFilms(@Query() query?) {
    return this.service.getAll('films', query);
  }

  @ApiOperation({
    description: 'Get a specific film resource',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Information about specific film',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/films/:id')
  async oneFilm(@Param('id') id: number) {
    return this.service.getOne('films', id);
  }

  @ApiOperation({
    description: 'Get all the species resources',
  })
  @ApiOkResponse({ status: 200, description: 'Array of species' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/species')
  async allSpecies(@Query() query?) {
    return this.service.getAll('species', query);
  }

  @ApiOperation({
    description: 'Get a specific spiece resource',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Information about specific spiece',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/species/:id')
  async oneSpiece(@Param('id') id: number) {
    return this.service.getOne('species', id);
  }

  @ApiOperation({
    description: 'Get all the vehicles resources',
  })
  @ApiOkResponse({ status: 200, description: 'Array of vehicles' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/vehicles')
  async allVehicles(@Query() query?) {
    return this.service.getAll('vehicles', query);
  }

  @ApiOperation({
    description: 'Get a specific vehicle resource',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Information about specific vehicle',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/vehicles/:id')
  async oneVehicle(@Param('id') id: number) {
    return this.service.getOne('vehicles', id);
  }

  @ApiOperation({
    description: 'Get all the starships resources',
  })
  @ApiOkResponse({ status: 200, description: 'Array of starships' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/starships')
  async allStarships(@Query() query?) {
    return this.service.getAll('starships', query);
  }

  @ApiOperation({
    description: 'Get a specific starship resource',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Information about specific starship',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/starships/:id')
  async oneStarship(@Param('id') id: number) {
    return this.service.getOne('starships', id);
  }

  @ApiOperation({
    description: 'Get all the planets resources',
  })
  @ApiOkResponse({ status: 200, description: 'Array of planets' })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/planets')
  async allPlanets(@Query() query?) {
    return this.service.getAll('planets', query);
  }

  @ApiOperation({
    description: 'Get a specific planet resource',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Information about specific planet',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get('/planets/:id')
  async onePlanet(@Param('id') id: number) {
    return this.service.getOne('planets', id);
  }
}
