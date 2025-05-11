import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { BasicTokenGuard } from '../common/guard/token.guard';
import { RequestWithExtension } from '../common/guard/token.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(BasicTokenGuard)
  async getPosts(@Req() req: RequestWithExtension) {
    return this.postsService.getPostsByRequest(req);
  }

  @Get('/all')
  getAllPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  @UseGuards(BasicTokenGuard)
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithExtension,
  ) {
    const user_id = req.user?.id;
    if (user_id) {
      return this.postsService.getPostById({ user_id, id });
    } else {
      throw new BadRequestException('email is not string');
    }
  }

  @Post()
  @UseGuards(BasicTokenGuard)
  createPost(
    @Body('title') title: string,
    @Body('category_id', ParseIntPipe) category_id: number,
    @Body('content') content: string,
    @Body('status', new DefaultValuePipe(null)) status: string | null,
    @Req() req: RequestWithExtension,
  ) {
    return this.postsService.createPost(
      req.user?.id,
      { title, category_id, content },
      status,
    );
  }
}
