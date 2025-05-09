import { Entity, Column } from 'typeorm';
import { BacklogBaseModel } from '../../common/BacklogBaseModel';

@Entity('roles')
export class RolesModel extends BacklogBaseModel {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false, default: false })
  is_system_role: boolean;
}
