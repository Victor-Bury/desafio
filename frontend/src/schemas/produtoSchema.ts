import { z } from 'zod';

export const produtoSchema = z.object({
  productModel: z.string().min(1, "Modelo obrigatório"),
  brand: z.string().min(1, "Marca obrigatória"),
  type: z.string().min(1, "Tipo obrigatório"),
  focalLength: z.string().optional(),
  maxAperture: z.string().optional(),
  mount: z.string().optional(),
  weight: z.number().optional(),
  hasStabilization: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type ProdutoForm = z.infer<typeof produtoSchema>;

export type ProdutoFormInput = z.input<typeof produtoSchema>;
export type ProdutoFormOutput = z.output<typeof produtoSchema>;