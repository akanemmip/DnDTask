import { NotFoundException } from '@nestjs/common';
import { AppController } from './app.controller';

let controller: AppController;
const service = {
  getAll: jest.fn(),
};
beforeAll(async () => {
  controller = new AppController(service as any);
});
describe('AppController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call films without query', async () => {
    service.getAll.mockResolvedValueOnce([]);
    await controller.allFilms();
    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(service.getAll).toHaveBeenCalledWith('films', undefined);
  });

  it('should call species without query', async () => {
    service.getAll.mockResolvedValueOnce([]);
    await controller.allSpecies();
    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(service.getAll).toHaveBeenCalledWith('species', undefined);
  });

  it('should call vehicles without query', async () => {
    service.getAll.mockResolvedValueOnce([]);
    await controller.allVehicles();
    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(service.getAll).toHaveBeenCalledWith('vehicles', undefined);
  });

  it('should call starships without query', async () => {
    service.getAll.mockResolvedValueOnce([]);
    await controller.allStarships();
    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(service.getAll).toHaveBeenCalledWith('starships', undefined);
  });

  it('should call planets without query', async () => {
    service.getAll.mockResolvedValueOnce([]);
    await controller.allPlanets();
    expect(service.getAll).toHaveBeenCalledTimes(1);
    expect(service.getAll).toHaveBeenCalledWith('planets', undefined);
  });

  it('should throw error when page does not exist', async () => {
    service.getAll.mockRejectedValueOnce(new NotFoundException());

    expect(controller.allFilms({ page: 100 })).rejects.toThrowError(
      NotFoundException,
    );
  });
});
