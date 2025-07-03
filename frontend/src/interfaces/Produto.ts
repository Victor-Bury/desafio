export interface Produto {
  _id: string;
  productModel: string;
  brand: string;
  type: string;
  focalLength?: string;
  maxAperture?: string;
  mount?: string;
  weight?: number;
  hasStabilization?: boolean;
  active?: boolean;
}