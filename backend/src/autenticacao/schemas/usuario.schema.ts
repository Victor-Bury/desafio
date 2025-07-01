import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Usuario extends Document {
  @Prop({ required: true, unique: true })
  nomeUsuario: string;

  @Prop({ required: true })
  senha: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
