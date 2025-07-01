import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './schemas/usuario.schema';
import { CredenciaisAutenticacaoDto } from './dto/credenciais-autenticacao.dto';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModelo: Model<Usuario>,
    private jwtService: JwtService,
  ) {}

  async registrar(
    credenciaisAuthDto: CredenciaisAutenticacaoDto,
  ): Promise<void> {
    const { nomeUsuario, senha } = credenciaisAuthDto;
    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(senha, salt);
    const novoUsuario = new this.usuarioModelo({
      nomeUsuario,
      senha: senhaCriptografada,
    });

    try {
      await novoUsuario.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Nome de usuário já existe.');
      }
      throw error;
    }
  }

  async entrar(
    credenciaisAuthDto: CredenciaisAutenticacaoDto,
  ): Promise<{ tokenAcesso: string }> {
    const { nomeUsuario, senha } = credenciaisAuthDto;
    const usuario = await this.usuarioModelo.findOne({ nomeUsuario }).exec();

    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const payload = { id: usuario._id };
      const tokenAcesso = await this.jwtService.signAsync(payload);
      return { tokenAcesso };
    } else {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
  }
}
