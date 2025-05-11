import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';
import { PostsModel } from './posts.entity';

@Entity('tags')
export class TagsModel extends BacklogBaseModel {
  @PrimaryColumn()
  name: string;

  @Column({ nullable: false })
  post_id: number;

  @PrimaryColumn()
  color_hex: string;

  @ManyToOne(() => PostsModel, (post) => post.tags)
  @JoinColumn({ name: 'post_id' })
  post: PostsModel;
}
