import { NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
let cacheService;
let service: AppService;
beforeAll(() => {
  cacheService = {
    findByRoute: jest.fn(),
    create: jest.fn(),
  };
  service = new AppService(cacheService as any);
});
describe('AppService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return data when route founded in database', async () => {
    cacheService.findByRoute.mockResolvedValue({ title: 'The Mandalorian' });

    const response = await service.getAll('films');

    expect(response).toBeTruthy();
  });

  it('should call cache.create when route not founded in database', async () => {
    cacheService.findByRoute.mockResolvedValueOnce(undefined);
    cacheService.create.mockResolvedValueOnce(undefined);

    await service.getAll('films');

    expect(cacheService.create).toHaveBeenCalledTimes(1);
  });

  it('should throw 404 when wrong route provided', async () => {
    cacheService.findByRoute.mockResolvedValueOnce(undefined);
    expect(service.getAll('series')).rejects.toThrowError(NotFoundException);
  });

  it('should return data when search query provided', async () => {
    cacheService.findByRoute.mockResolvedValueOnce(undefined);
    cacheService.create.mockResolvedValueOnce(undefined);

    const response = await service.getAll('planets', { search: 'hoth' });

    expect(response.results).toBeTruthy();
    expect(response.count).toEqual(1);
  });

  it('should return empty array when wrong search query provided', async () => {
    cacheService.findByRoute.mockResolvedValueOnce(undefined);
    cacheService.create.mockResolvedValueOnce(undefined);

    const response = await service.getAll('planets', { search: 'earth' });

    expect(response.results).toEqual([]);
    expect(response.count).toEqual(0);
  });

  it('should return data when id provided and founded in database', async () => {
    cacheService.findByRoute.mockResolvedValueOnce({
      title: 'The Force Awakens',
    });

    const response = await service.getOne('films', 1);

    expect(cacheService.findByRoute).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/films/1',
    );
    expect(cacheService.findByRoute).toHaveBeenCalledTimes(1);
    expect(response).toBeTruthy();
  });

  it('should throw 404 when object with given id not found', async () => {
    cacheService.findByRoute.mockResolvedValue(undefined);
    cacheService.create.mockResolvedValueOnce(undefined);

    expect(service.getOne('films', 20)).rejects.toThrowError(NotFoundException);
  });
});
