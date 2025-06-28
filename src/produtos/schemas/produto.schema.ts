import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Produto extends Document {
  @Prop({ type: String, required: true, alias: 'model' }) // mongoose conflita com a palavra 'model'
  model1: string; 

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  focalLength: string;

  @Prop()
  maxAperture: string;

  @Prop()
  mount: string;

  @Prop()
  weight: number;

  @Prop()
  hasStabilization: boolean;

  @Prop({ default: true })
  active: boolean;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);