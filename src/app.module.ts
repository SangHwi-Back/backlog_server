import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AssetsModule } from './assets/assets.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { AppSeedService } from './app.seed.service';
import { RolesModel } from './auth/entities/roles.entity';
import { PermissionsModel } from './auth/entities/permissions.entity';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    AssetsModule,
    CategoriesModule,
    CommentsModule,
    // env 관련
    ConfigModule.forRoot({ isGlobal: true }),
    // postgres 설정
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '0', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 3000,
    }),
    TypeOrmModule.forFeature([RolesModel, PermissionsModel]),
  ],
  controllers: [AppController],
  providers: [AppService, AppSeedService],
})
export class AppModule {}
