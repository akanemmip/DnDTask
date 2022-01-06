import { CacheService } from './cache.service';

const prisma = {
  cache: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
};
let service: CacheService;

beforeAll(() => {
  service = new CacheService(prisma as any);
});

describe('CacheService', () => {
  const example = {
    route: 'some/route',
    response: JSON.stringify({ title: 'The Mandalorian' }),
    timestamp: new Date().valueOf(),
  };
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call findMany', async () => {
    prisma.cache.findMany.mockResolvedValue([]);

    await service.getAll();

    expect(prisma.cache.findMany).toHaveBeenCalledTimes(1);
  });

  it('should call deleteMany, findUnique', async () => {
    prisma.cache.deleteMany.mockResolvedValue(undefined);
    prisma.cache.findUnique.mockResolvedValue({ response: '{}' });

    await service.findByRoute('');

    expect(prisma.cache.deleteMany).toHaveBeenCalledTimes(1);
    expect(prisma.cache.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.cache.findUnique).toHaveBeenCalledWith({
      where: { route: '' },
    });
  });

  it('should return response when founded', async () => {
    prisma.cache.deleteMany.mockResolvedValue(undefined);
    prisma.cache.findUnique.mockResolvedValue({
      response: JSON.stringify(example),
    });

    const response = await service.findByRoute('some/route');
    expect(response).toEqual(example);
  });

  it('should return null when response not found', async () => {
    prisma.cache.deleteMany.mockResolvedValue(undefined);
    prisma.cache.findUnique.mockResolvedValue(null);
    const response = await service.findByRoute('another/route');
    expect(response).toBeNull();
  });

  it('should call create', async () => {
    prisma.cache.create.mockResolvedValue(undefined);

    await service.create(example);

    expect(prisma.cache.create).toHaveBeenCalledTimes(1);
    expect(prisma.cache.create).toHaveBeenLastCalledWith({ data: example });
  });
});
