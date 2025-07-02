import { IsOptional, IsString, IsNumber, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class ObterProdutosFiltroDto {
  @IsOptional()
  @IsString()
  busca?: string; 
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pagina?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limite?: number;

  @IsOptional()
  @IsString()
  sortBy?: string; 
  @IsOptional()
  @IsIn(['asc', 'desc']) 
  order?: 'asc' | 'desc';
}
