import { Entity, Column } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';

export enum BacklogPermission {
  comment = 'comment',
  commentOthersAdd = 'comment_others_add',
  commentOthersDelete = 'comment_others_delete',
}

@Entity('permissions')
export class PermissionsModel extends BacklogBaseModel {
  @Column({
    type: 'enum',
    enum: BacklogPermission,
  })
  permission: BacklogPermission;

  @Column({ nullable: false })
  description: string;
}
