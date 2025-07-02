export interface Produto {
  _id: string;
  model1: string;
  brand: string;
  type: string;
  focalLength?: string;
  maxAperture?: string;
  mount?: string;
  weight?: number;
  hasStabilization?: boolean;
  active?: boolean;
}