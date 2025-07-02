import { z } from 'zod';

export const produtoSchema = z.object({
  model: z.string().min(1, 'Modelo é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  focalLength: z.string().optional(),
  maxAperture: z.string().optional(),
  mount: z.string().optional(),
  weight: z.number()
    .int({ message: 'Peso deve ser um número inteiro.' })
    .positive({ message: 'Peso deve ser positivo.' })
    .optional(),
  hasStabilization: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type ProdutoForm = z.infer<typeof produtoSchema>;
