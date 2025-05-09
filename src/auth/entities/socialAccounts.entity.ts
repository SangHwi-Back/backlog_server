import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BacklogBaseModel } from '../../common/BacklogBaseModel';
import { UsersModel } from './users.entity';

@Entity('social_accounts')
export class SocialAccountsModel extends BacklogBaseModel {
  @Column({ nullable: false })
  user_id: number;

  @Column({ unique: true })
  provider: string;

  @Column({ unique: true })
  provider_id: string;

  @Column()
  email: string;

  @OneToOne(() => UsersModel, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UsersModel;
}
