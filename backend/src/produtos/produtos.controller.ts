import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { ObterProdutosFiltroDto } from './dto/obter-produtos-filtro.dto';
import { Produto } from './schemas/produto.schema';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async criar(@Body() criarProdutoDto: CriarProdutoDto): Promise<Produto> {
    return this.produtosService.criar(criarProdutoDto);
  }

  @Get()
  async buscarTodos(
    @Query() filtroDto: ObterProdutosFiltroDto,
  ): Promise<Produto[]> {
    return this.produtosService.buscarTodos(filtroDto);
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string): Promise<Produto> {
    return this.produtosService.buscarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async atualizar(
    @Param('id') id: string,
    @Body() atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto> {
    return this.produtosService.atualizar(id, atualizarProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async remover(@Param('id') id: string): Promise<any> {
    return this.produtosService.remover(id);
  }
}
