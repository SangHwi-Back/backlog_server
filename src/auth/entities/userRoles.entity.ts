import { Entity, PrimaryColumn } from 'typeorm';

@Entity('user_roles')
export class UserRolesModel {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  role_id: number;
}
