import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarProdutoDto {
  @ApiProperty({
    example: 'NIKKOR Z 24-70mm f/2.8 S',
    description: 'O modelo do produto.',
  })
  @IsString()
  @IsNotEmpty()
  productModel: string;

  @ApiProperty({ example: 'Nikon', description: 'A marca do produto.' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    example: 'Zoom',
    description: 'O tipo de produto (ex: Prime, Zoom, Macro).',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: '24-70mm',
    description: 'A distância focal da lente.',
    required: false,
  })
  @IsString()
  @IsOptional()
  focalLength?: string;

  @ApiProperty({
    example: 'f/2.8',
    description: 'A abertura máxima da lente.',
    required: false,
  })
  @IsString()
  @IsOptional()
  maxAperture?: string;

  @ApiProperty({
    example: 'Nikon Z',
    description: 'O tipo de encaixe da lente/câmera.',
    required: false,
  })
  @IsString()
  @IsOptional()
  mount?: string;

  @ApiProperty({
    example: 805,
    description: 'O peso do produto em gramas.',
    required: false,
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  weight?: number;

  @ApiProperty({
    example: true,
    description: 'Indica se o produto possui estabilização de imagem.',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  hasStabilization?: boolean;

  @ApiProperty({
    example: true,
    description: 'Indica se o produto está ativo no catálogo.',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

