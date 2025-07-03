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
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { ProdutosService } from './produtos.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { ObterProdutosFiltroDto } from './dto/obter-produtos-filtro.dto';
import { Produto } from './schemas/produto.schema';

interface PaginatedProductsResponse {
  produtos: Produto[];
  totalPaginas: number;
}

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponse({ status: 201, description: 'O produto foi criado com sucesso.'})
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async criar(@Body() criarProdutoDto: CriarProdutoDto): Promise<Produto> {
    return this.produtosService.criar(criarProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os produtos com filtros e paginação' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.'})
  async buscarTodos(
    @Query() filtroDto: ObterProdutosFiltroDto,
  ): Promise<PaginatedProductsResponse> {
    return this.produtosService.buscarTodos(filtroDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um produto específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.'})
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async buscarPorId(@Param('id') id: string): Promise<Produto> {
    return this.produtosService.buscarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um produto existente' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.'})
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async atualizar(
    @Param('id') id: string,
    @Body() atualizarProdutoDto: AtualizarProdutoDto,
  ): Promise<Produto> {
    return this.produtosService.atualizar(id, atualizarProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove (inativa) um produto' })
  @ApiResponse({ status: 204, description: 'Produto inativado com sucesso.'})
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  async remover(@Param('id') id: string): Promise<any> {
    return this.produtosService.remover(id);
  }
}
