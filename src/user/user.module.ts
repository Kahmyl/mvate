import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [CreateUserService],
  controllers: [UserController],
})
export class UserModule {}
