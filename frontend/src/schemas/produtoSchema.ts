import { z } from 'zod';

export const produtoSchema = z.object({
  productModel: z.string().min(1, "Modelo obrigatório"),
  brand: z.string().min(1, "Marca obrigatória"),
  type: z.string().min(1, "Tipo obrigatório"),
  focalLength: z.string().optional(),
  maxAperture: z.string().optional(),
  mount: z.string().optional(),
  weight: z.number({ invalid_type_error: 'Peso deve ser um número.' }).transform(val => isNaN(val) ? undefined : val).refine(val => val === undefined || (Number.isInteger(val) && val > 0), {message: 'Peso deve ser um número inteiro e positivo.',}).optional(),
  hasStabilization: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type ProdutoForm = z.infer<typeof produtoSchema>;
export type ProdutoFormInput = z.input<typeof produtoSchema>;
export type ProdutoFormOutput = z.output<typeof produtoSchema>;