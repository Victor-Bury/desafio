import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  model: string; // <-- Usamos 'model' aqui, como você queria.

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  focalLength?: string;

  @IsString()
  @IsOptional()
  maxAperture?: string;

  @IsString()
  @IsOptional()
  mount?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsBoolean()
  @IsOptional()
  hasStabilization?: boolean;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}