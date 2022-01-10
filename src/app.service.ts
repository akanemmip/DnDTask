import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CacheService } from './cache/cache.service';
import {
  serializeQuery,
  createStringHelper,
} from './helpers/app.service.helper';
import { Trie } from './Trie/trie';

@Injectable()
export class AppService {
  constructor(private readonly cache: CacheService) {}
  async getAll(thing: string, query?) {
    const stringQuery = query ? serializeQuery(query) : null;
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
          timestamp: new Date(),
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
          timestamp: new Date(),
        };
        await this.cache.create(data);
      }
    }

    return await response;
  }

  async openingCrawlAnalysis() {
    const uniquePairsArray = await this.getDictionary();
    const mostPopularCharacter = await this.getMostPopularCharacter();
    const trieNodesNumber = await this.numberOfNodesTrie();

    return {
      uniquePairsArray,
      mostPopularCharacter,
      trieNodesNumber,
    };
  }

  private async getDictionary() {
    const dictionary = {};
    const resultArr = [];
    const response = await this.getAll('films');
    const openingCrawls = createStringHelper(response.results).split(' ');

    openingCrawls.forEach((word) => {
      if (!dictionary[word]) {
        dictionary[word] = openingCrawls.filter((el) => el === word).length;
      }
    });

    for (const [k, v] of Object.entries(dictionary)) {
      resultArr.push(`${k} ${v}`);
    }
    return resultArr;
  }

  private async getNamesDict() {
    const response = await this.getAll('films');
    const openingCrawls = createStringHelper(response.results);
    const names = await this.getNamesArray();
    const dict = {};
    names.forEach((n) => {
      const regex = new RegExp(n, 'g');
      dict[n] = (openingCrawls.match(regex) || []).length;
    });

    return dict;
  }

  private async getNamesArray() {
    let names = [];
    let i = 1;
    let response = await this.getAll('people', { page: i });
    const maxLen = response.count;
    while (true) {
      const namesPerPage = response.results.map((p) => p.name);

      names = names.concat(namesPerPage);
      if (names.length >= maxLen) break;
      i++;
      response = await this.getAll('people', { page: i });
    }
    return names;
  }

  private async getMostPopularCharacter() {
    const character = {
      name: '',
      occ: 0,
    };
    let arrChar = [character];
    const namesDict = await this.getNamesDict();

    Object.keys(namesDict).forEach((k) => {
      if (namesDict[k] && namesDict[k] > character.occ) {
        character.name = k;
        character.occ = namesDict[k];
        arrChar = arrChar.filter((el) => el.occ === character.occ);
      } else if (namesDict[k] && namesDict[k] === character.occ) {
        character.name = k;
        character.occ = namesDict[k];
        arrChar = arrChar.filter((el) => el.occ === character.occ);
        arrChar.push({ name: k, occ: namesDict[k] });
      }
    });
    return arrChar;
  }

  private async numberOfNodesTrie() {
    const dictionary = await this.getDictionary();
    const trie = new Trie();
    const wordsArr = dictionary.map((el) => el.split(' ')[0]);
    wordsArr.forEach((w) => trie.insert(w));

    return trie.count;
  }
}
