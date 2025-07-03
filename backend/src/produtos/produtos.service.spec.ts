import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProdutosService } from './produtos.service';
import { Produto } from './schemas/produto.schema';
import { ObterProdutosFiltroDto } from './dto/obter-produtos-filtro.dto';

const mockProduto = {
  _id: 'some-id',
  productModel: 'Test Model',
  brand: 'Test Brand',
  type: 'Zoom',
  active: true,
};

const mockProdutoModel = {
  find: jest.fn(),
  countDocuments: jest.fn(),

};

describe('ProdutosService', () => {
  let service: ProdutosService;
  let model: Model<Produto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getModelToken(Produto.name),
          useValue: mockProdutoModel,
        },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
    model = module.get<Model<Produto>>(getModelToken(Produto.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('buscarTodos', () => {
    it('deve retornar uma lista paginada de produtos', async () => {
      const filtroDto: ObterProdutosFiltroDto = { pagina: 1, limite: 5 };
      const mockProdutosArray = [mockProduto];
      const findQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockProdutosArray),
      };
      (model.find as jest.Mock).mockReturnValue(findQuery);
      (model.countDocuments as jest.Mock).mockResolvedValue(1);

      const resultado = await service.buscarTodos(filtroDto);

      expect(model.find).toHaveBeenCalledWith({ active: true });
      expect(findQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(findQuery.skip).toHaveBeenCalledWith(0);
      expect(findQuery.limit).toHaveBeenCalledWith(5);
      expect(resultado.produtos).toEqual(mockProdutosArray);
      expect(resultado.totalPaginas).toBe(1);
    });

    it('deve aplicar filtros de busca e tipo corretamente', async () => {
      const filtroDto: ObterProdutosFiltroDto = { busca: 'Test', type: 'Zoom' };
      
      const findQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      };
      (model.find as jest.Mock).mockReturnValue(findQuery);
      (model.countDocuments as jest.Mock).mockResolvedValue(0);

      await service.buscarTodos(filtroDto);

      const expectedQuery = {
        active: true,
        $or: [
          { brand: { $regex: 'Test', $options: 'i' } },
          { productModel: { $regex: 'Test', $options: 'i' } },
        ],
        type: { $regex: 'Zoom', $options: 'i' },
      };

      expect(model.find).toHaveBeenCalledWith(expectedQuery);
    });
  });
});
