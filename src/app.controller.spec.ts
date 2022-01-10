import { NotFoundException } from '@nestjs/common';
import { AppController } from './app.controller';

let controller: AppController;
const service = {
  getAll: jest.fn(),
  getOne: jest.fn(),
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

  it('should call films with an id', async () => {
    service.getOne.mockResolvedValueOnce({ id: 1, title: 'The Mandalorian' });
    await controller.oneFilm(1);

    expect(service.getOne).toHaveBeenCalledTimes(1);
    expect(service.getOne).toHaveBeenCalledWith('films', 1);
  });

  it('should throw error when page does not exist', async () => {
    service.getAll.mockRejectedValueOnce(new NotFoundException());

    expect(controller.allFilms({ page: 100 })).rejects.toThrowError(
      NotFoundException,
    );
  });
});
