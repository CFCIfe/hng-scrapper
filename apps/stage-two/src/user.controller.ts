import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  FailureDto,
  RegisterUserDto,
  SuccessDto,
  UserLoginDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('/register')
  async registerUser(
    @Body(new ValidationPipe()) registerUserDto: RegisterUserDto,
  ): Promise<SuccessDto | FailureDto> {
    return this.userService.RegisterUser(registerUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Body(new ValidationPipe()) userLoginDto: UserLoginDto,
  ): Promise<SuccessDto | UnauthorizedException> {
    return this.userService.LoginUser(userLoginDto);
  }
}
