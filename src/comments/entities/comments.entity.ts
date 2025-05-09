import { BacklogBaseModel } from '../../common/BacklogBaseModel';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PostsModel } from '../../posts/entities/posts.entity';
import { UsersModel } from '../../auth/entities/users.entity';

@Entity('comments')
export class Comments extends BacklogBaseModel {
  @Column({ name: 'post_id', nullable: true })
  postId: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @OneToOne(() => PostsModel, { nullable: true })
  @JoinColumn({ name: 'post_id' })
  post: PostsModel;

  @OneToOne(() => UsersModel, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersModel;
}
