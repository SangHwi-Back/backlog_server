import { Entity, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';
import { UsersModel } from '../../auth/entities/users.entity';
import { TagsModel } from './tags.entity';

@Entity('posts')
export class PostsModel extends BacklogBaseModel {
  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  category_id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ default: 'draft' })
  status: string;

  @Column({ default: 0 })
  view_count: number;

  @OneToOne(() => UsersModel, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UsersModel;

  @OneToMany(() => TagsModel, (tag) => tag.post)
  @JoinColumn({ name: 'id' })
  tags: TagsModel[];
}
