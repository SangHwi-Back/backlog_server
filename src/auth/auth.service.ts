import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { LoginUserDto, RegisterUserDto } from './dto/UserDto';

type LocalJWTToken = {
  token: string;
  // If false, Basic token
  isBearer: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    private readonly jwtService: JwtService,
  ) {}

  extractTokenFromHeader(rawToken: string): LocalJWTToken {
    const split = rawToken.split(' ');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }
    if (!['Bearer', 'Basic'].includes(split[0])) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    return {
      token: split[1],
      isBearer: split[0] === 'Bearer',
    };
  }

  decodeBase64Token(token: string) {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    return {
      email: split[0],
      password: split[1],
    };
  }

  async getUserWithParamEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다');
    }

    try {
      const compareResult = await bcrypt.compare(password, user.password);
      if (!compareResult) {
        throw new UnauthorizedException('비밀번호가 틀림');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async getUserWithParamEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다');
    }

    return user;
  }

  async getUserWithParamToken(token: string) {
    const { email, password } = this.decodeBase64Token(token);
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다');
    }

    try {
      const compareResult = await bcrypt.compare(password, user.password);
      if (!compareResult) {
        throw new UnauthorizedException('비밀번호가 틀림');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  async loginUser(user: LoginUserDto) {
    const existingUser = await this.getUserWithParamEmailAndPassword(
      user.email,
      user.password,
    );

    return {
      accessToken: this.getJWTSignToken(existingUser, false),
      refreshToken: this.getJWTSignToken(existingUser, true),
    };
  }

  getJWTSignToken(user: UsersModel, isRefreshToken: boolean) {
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: isRefreshToken ? '2h' : '1h',
      },
    );
  }

  async createUser(user: RegisterUserDto) {
    const nickNameExists = await this.usersRepository.exists({
      where: { nick_name: user.nick_name },
    });

    if (nickNameExists) {
      throw new BadRequestException('이미 존재하는 Nickname 입니다.');
    }

    const emailExists = await this.usersRepository.exists({
      where: { email: user.email },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 Email 입니다.');
    }

    const userEntity = this.usersRepository.create({
      nick_name: user.nick_name,
      password: user.password,
      email: user.email,
    });

    return await this.usersRepository.save(userEntity);
  }
}
