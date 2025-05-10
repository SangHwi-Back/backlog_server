import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';
import { RolesModel } from './roles.entity';
import { PostsModel } from '../../posts/entities/posts.entity';
import { PermissionsModel } from './permissions.entity';

@Entity('users')
export class UsersModel extends BacklogBaseModel {
  @Column({ nullable: false, unique: true })
  nick_name: string;

  @Column({ nullable: false, comment: 'jwt' })
  password: string;

  @Column({ nullable: false })
  role_id: number;

  @Column({ nullable: false })
  permission_id: number;

  @Column({ nullable: false, default: '' })
  avatar_url: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => RolesModel, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: RolesModel;

  @OneToOne(() => PermissionsModel, (permission) => permission.id)
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionsModel;

  @OneToMany(() => PostsModel, (post) => post.user_id)
  posts: PostsModel[];
}
