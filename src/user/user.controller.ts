import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { successResponse, SuccessResponseType } from 'src/utils/response';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './services/create-user';

@Controller('user')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() data: CreateUserDto): Promise<SuccessResponseType> {
    const result = await this.createUserService.execute(data);
    return successResponse({
      message: 'User Account has been created',
      code: HttpStatus.CREATED,
      data: result,
    });
  }
}
