import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose/dist';
import { Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop({ unique: true, nullable: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now() })
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});
