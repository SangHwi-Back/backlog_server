import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { RequestWithExtension } from '../common/guard/token.guard';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
    private readonly authService: AuthService,
  ) {}

  getPosts() {
    return this.postsRepository.find({
      relations: ['tags'],
    });
  }

  async getPostsByRequest(req: RequestWithExtension) {
    const email = req.user?.email;
    if (email) {
      const user = await this.authService.getUserWithParamEmail(email);
      return this.postsRepository.find({
        where: { user_id: user.id },
      });
    } else {
      throw new BadRequestException('email is not string');
    }
  }

  getPostById(param: Pick<PostsModel, 'user_id' | 'id'>) {
    return this.postsRepository.findOne({
      where: {
        user_id: param.user_id,
        id: param.id,
      },
      relations: ['tags'],
    });
  }

  async createPost(
    user_id: number | undefined,
    param: Pick<PostsModel, 'title' | 'category_id' | 'content'>,
    status: string | null,
  ) {
    if (!user_id) {
      throw new BadRequestException('사용자 ID 가 확인되지 않았습니다.');
    }

    const isVerified = await this.authService.verityUserById(user_id);

    if (!isVerified) {
      throw new BadRequestException('사용자 ID 가 확인되지 않았습니다.');
    }

    const post = this.postsRepository.create(param);
    if (status != null) {
      post.status = status;
    }

    await this.postsRepository.save(post);
    return post;
  }
}
