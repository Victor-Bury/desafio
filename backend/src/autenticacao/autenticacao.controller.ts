import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { CredenciaisAutenticacaoDto } from './dto/credenciais-autenticacao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private autenticacaoService: AutenticacaoService) {}

  @Post('/registrar')
  @HttpCode(HttpStatus.CREATED)
  async registrar(
    @Body() credenciaisAuthDto: CredenciaisAutenticacaoDto,
  ): Promise<void> {
    return this.autenticacaoService.registrar(credenciaisAuthDto);
  }

  @Post('/entrar')
  @HttpCode(HttpStatus.OK)
  async entrar(
    @Body() credenciaisAuthDto: CredenciaisAutenticacaoDto,
  ): Promise<{ tokenAcesso: string }> {
    return this.autenticacaoService.entrar(credenciaisAuthDto);
  }
}
