import { Entity, Column } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';

@Entity('permissions')
export class PermissionsModel extends BacklogBaseModel {
  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;
}
