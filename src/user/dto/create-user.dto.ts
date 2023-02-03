import { IsString } from 'class-validator';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { User } from '../schema/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
