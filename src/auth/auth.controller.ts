import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './dto/UserDto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '새로운 사용자 등록' })
  @ApiResponse({ status: 201, description: '사용자 등록 성공' })
  @Post('register/user')
  registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.createUser(dto);
  }

  @ApiOperation({ summary: '사용자 로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공, 토큰 반환' })
  @Post('login')
  loginUser(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }
}
