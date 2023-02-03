import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/authentication';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(data: CreateUserDto) {
    try {
      const hashed = await hashPassword(data.password);
      data.password = hashed;
      const result = await new this.userModel(data);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
