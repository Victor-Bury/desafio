import { z } from 'zod';

export const produtoSchema = z.object({
  model: z.string().min(1, 'Modelo é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  focalLength: z.string().optional(),
  maxAperture: z.string().optional(),
  mount: z.string().optional(),
  weight: z
    .preprocess((val) => (val === '' ? undefined : Number(val)), z.number().int().positive().optional()),
  hasStabilization: z.coerce.boolean().optional(),
  active: z.coerce.boolean().optional(),
});

export type ProdutoForm = z.infer<typeof produtoSchema>;
