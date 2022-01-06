import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from './cache/cache.service';

@Injectable()
export class AppService {
  constructor(private readonly cache: CacheService) {}
  async getAll(thing: string, query?) {
    const stringQuery = query ? this.serializeQuery(query) : null;
    const route = stringQuery
      ? `https://swapi.py4e.com/api/${thing}${stringQuery}`
      : `https://swapi.py4e.com/api/${thing}/`;

    // check if route is in db
    let response = await this.cache.findByRoute(route);

    if (!response) {
      try {
        response = await axios.get(route);
        response = response.data;
      } catch (e) {
        throw new NotFoundException(e.response.data);
      } finally {
        const data = {
          route,
          response: JSON.stringify(response),
          timestamp: new Date().valueOf(),
        };
        await this.cache.create(data);
      }
    }

    return await response;
  }

  async getOne(thing: string, id: number) {
    const route = `https://swapi.py4e.com/api/${thing}/${id}`;
    let response = await this.cache.findByRoute(route);

    if (!response) {
      try {
        response = await axios.get(route);
        response = response.data;
      } catch (e) {
        throw new NotFoundException(e.response.data);
      } finally {
        const data = {
          route,
          response: JSON.stringify(response),
          timestamp: new Date().valueOf(),
        };
        await this.cache.create(data);
      }
    }

    return await response;
  }

  private serializeQuery(query) {
    let stringQuery = '';
    Object.keys(query).forEach((key) => {
      stringQuery += `/?${key}=${query[key]}`;
    });

    return stringQuery;
  }
}
