import { Entity, Column } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';

export enum BacklogUserRole {
  user = 'user',
  admin = 'admin',
}

@Entity('roles')
export class RolesModel extends BacklogBaseModel {
  @Column({ nullable: false, default: false })
  is_system_role: boolean;

  @Column({
    type: 'enum',
    enum: BacklogUserRole,
    transformer: {
      to: (value: BacklogUserRole) => value,
      from: (value: number) =>
        value === 1 ? BacklogUserRole.user : BacklogUserRole.admin,
    },
  })
  role: BacklogUserRole;
}
