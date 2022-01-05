import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getAll(thing: string, query?) {
    const stringQuery = query ? this.serializeQuery(query) : null;
    let response;
    try {
      response = stringQuery
        ? await axios.get(`https://swapi.dev/api/${thing}/${stringQuery}`)
        : await axios.get(`https://swapi.dev/api/${thing}/`);
    } catch (e) {
      throw new NotFoundException(e.response.data);
    }

    return await response.data;
  }

  async getOne(thing: string, id: number) {
    let response;
    try {
      response = await axios.get(`https://swapi.dev/api/${thing}/${id}`);
    } catch (e) {
      throw new NotFoundException(e.response.data);
    }

    return await response.data;
  }

  private serializeQuery(query) {
    let stringQuery = '';
    Object.keys(query).forEach((key) => {
      stringQuery += `/?${key}=${query[key]}`;
    });

    return stringQuery;
  }
}
