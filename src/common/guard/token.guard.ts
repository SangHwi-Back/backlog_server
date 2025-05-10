import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from '../../auth/entities/users.entity';
import { Repository } from 'typeorm';

interface RequestWithExtension extends Request {
  user?: any;
  tokenType?: string;
}

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<RequestWithExtension>();
    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException();
    }

    const { token, isBearer } =
      this.authService.extractTokenFromHeader(rawToken);
    const { email, password } = this.authService.decodeBase64Token(token);

    req.tokenType = isBearer ? 'Bearer' : 'Basic';
    req.user = await this.authService.getUserWithParamEmailAndPassword(
      email,
      password,
    );

    return true;
  }
}
