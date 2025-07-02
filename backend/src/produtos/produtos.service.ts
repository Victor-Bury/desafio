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
    // Renomeia 'model' para 'model1' para corresponder ao schema
    const produtoParaCriar = {
      ...criarProdutoDto,
      model1: criarProdutoDto.model,
    };
    delete (produtoParaCriar as any).model;

    return this.produtoModelo.create(produtoParaCriar);
  }

  async buscarTodos(filtroDto: ObterProdutosFiltroDto): Promise<Produto[]> {
    const { busca, type, pagina = 1, limite = 10, sortBy = 'createdAt', order = 'desc' } = filtroDto;
    const query: any = { active: true };


    if (busca) {
      query.$or = [
        { brand: { $regex: busca, $options: 'i' } },
        { model1: { $regex: busca, $options: 'i' } },
      ];
    }
    
    if (type) {
      query.type = { $regex: type, $options: 'i' };
    }

    const skip = (pagina - 1) * limite;
 
    const sortOptions: Record<string, 1 | -1> = { [sortBy]: order === 'asc' ? 1 : -1 };

    return this.produtoModelo.find(query).sort(sortOptions).skip(skip).limit(limite).exec();
  }

  async buscarPorId(id: string): Promise<Produto> {
    const produto = await this.produtoModelo
      .findOne({ _id: id, active: true })
      .exec();

    if (!produto) {
      throw new NotFoundException(
        `Produto com ID "${id}" não encontrado ou inativo.`,
      );
    }
    return produto;
  }

  async atualizar(
    id: string,
    atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto> {
    const dadosParaAtualizar: any = { ...atualizarProdutoDto };
    if (atualizarProdutoDto.model) {
      dadosParaAtualizar.model1 = atualizarProdutoDto.model;
      delete dadosParaAtualizar.model;
    }

    const produtoExistente = await this.produtoModelo
      .findByIdAndUpdate(id, dadosParaAtualizar, { new: true })
      .exec();

    if (!produtoExistente) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    return produtoExistente;
  }

  async remover(id: string): Promise<any> {
    const produtoInativado = await this.produtoModelo
      .findByIdAndUpdate(id, { active: false }, { new: true })
      .exec();

    if (!produtoInativado) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }

    return { message: `Produto com ID "${id}" foi inativado com sucesso.` };
  }
}