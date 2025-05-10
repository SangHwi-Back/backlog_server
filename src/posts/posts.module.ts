import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModel } from '../auth/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsModel, UsersModel]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
