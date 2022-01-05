import { NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';

describe('AppService', () => {
  const service = new AppService();
  it('should return data when good endpoint provided', async () => {
    const response = await service.getAll('films');

    expect(response.results).toBeTruthy();
  });

  it('should throw 404 when wrong endpoint provided', async () => {
    expect(service.getAll('wookie')).rejects.toThrow(NotFoundException);
  });

  it('should return data when page query provided', async () => {
    const response = await service.getAll('starships', { page: 1 });
    expect(response.results).toBeTruthy();
  });

  it('should throw 404 when wrong page query provided', async () => {
    expect(service.getAll('starships', { page: 100 })).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return data when search query provided', async () => {
    const response = await service.getAll('planets', { search: 'hoth' });
    expect(response.results).toBeTruthy();
    expect(response.count).toEqual(1);
  });

  it('should return empty array when wrong search query provided', async () => {
    const response = await service.getAll('planets', { search: 'earth' });
    expect(response.results).toEqual([]);
    expect(response.count).toEqual(0);
  });
});
