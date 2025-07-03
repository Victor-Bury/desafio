import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { AutenticacaoService } from './autenticacao.service';
import { Usuario } from './schemas/usuario.schema';
import { CredenciaisAutenticacaoDto } from './dto/credenciais-autenticacao.dto';

const mockUsuario = {
  _id: 'some-user-id',
  nomeUsuario: 'testuser',
  senha: 'hashedPassword',
  save: jest.fn().mockResolvedValue(this),
};

const mockUsuarioModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;
  let model: Model<Usuario>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AutenticacaoService,
        {
          provide: getModelToken(Usuario.name),
          useValue: {
            create: jest.fn().mockImplementation(() => ({
              save: jest.fn().mockResolvedValue(mockUsuario),
            })),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AutenticacaoService>(AutenticacaoService);
    model = module.get<Model<Usuario>>(getModelToken(Usuario.name));
    jwtService = module.get<JwtService>(JwtService);

    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('some-salt' as never);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('registrar', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const credenciaisDto: CredenciaisAutenticacaoDto = {
        nomeUsuario: 'newUser',
        senha: 'password123',
      };

      await service.registrar(credenciaisDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'some-salt');
    });

    it('deve lançar um ConflictException se o nome de usuário já existir', async () => {
      const credenciaisDto: CredenciaisAutenticacaoDto = {
        nomeUsuario: 'existingUser',
        senha: 'password123',
      };
      
      const mockSave = jest.fn().mockRejectedValue({ code: 11000 });
      (model.create as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      await expect(service.registrar(credenciaisDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('entrar', () => {
    it('deve retornar um token de acesso para credenciais válidas', async () => {
      const credenciaisDto: CredenciaisAutenticacaoDto = {
        nomeUsuario: 'testuser',
        senha: 'correctPassword',
      };

      (model.findOne as jest.Mock).mockResolvedValue(mockUsuario);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      (jwtService.signAsync as jest.Mock).mockResolvedValue('accessToken');

      const resultado = await service.entrar(credenciaisDto);

      expect(model.findOne).toHaveBeenCalledWith({ nomeUsuario: 'testuser' });
      expect(bcrypt.compare).toHaveBeenCalledWith('correctPassword', 'hashedPassword');
      expect(jwtService.signAsync).toHaveBeenCalledWith({ id: 'some-user-id' });
      expect(resultado).toEqual({ tokenAcesso: 'accessToken' });
    });

    it('deve lançar um UnauthorizedException para senha incorreta', async () => {
      const credenciaisDto: CredenciaisAutenticacaoDto = {
        nomeUsuario: 'testuser',
        senha: 'wrongPassword',
      };

      (model.findOne as jest.Mock).mockResolvedValue(mockUsuario);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(service.entrar(credenciaisDto)).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar um UnauthorizedException se o usuário não for encontrado', async () => {
      const credenciaisDto: CredenciaisAutenticacaoDto = {
        nomeUsuario: 'nonexistentuser',
        senha: 'anypassword',
      };

      (model.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.entrar(credenciaisDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
