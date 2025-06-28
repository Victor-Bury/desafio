import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto } from './schemas/produto.schema';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { ObterProdutosFiltroDto } from './dto/obter-produtos-filtro.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto.name) private produtoModelo: Model<Produto>,
  ) {}

  async criar(criarProdutoDto: CriarProdutoDto): Promise<Produto> {
    return this.produtoModelo.create(criarProdutoDto);
  }

  async buscarTodos(
    filtroDto: ObterProdutosFiltroDto,
  ): Promise<Produto[]> {
    const { brand, type, pagina = 1, limite = 10 } = filtroDto;
    const query: any = {};

    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }
    if (type) {
      query.type = { $regex: type, $options: 'i' };
    }

    const skip = (pagina - 1) * limite;
    return this.produtoModelo.find(query).skip(skip).limit(limite).exec();
  }

  async buscarPorId(id: string): Promise<Produto> {
    const produto = await this.produtoModelo.findById(id).exec();
    if (!produto) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    return produto;
  }

  async atualizar(
    id: string,
    atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto> {
    const produtoExistente = await this.produtoModelo
      .findByIdAndUpdate(id, atualizarProdutoDto, { new: true })
      .exec();
    if (!produtoExistente) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    return produtoExistente;
  }

  async remover(id: string): Promise<any> {
    const produtoDeletado = await this.produtoModelo.findByIdAndDelete(id).exec();
    if (!produtoDeletado) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    return { message: `Produto com ID "${id}" deletado com sucesso.` };
  }
}