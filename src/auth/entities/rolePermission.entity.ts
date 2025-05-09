import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role_permission')
export class RolePermissionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  role_id: number;

  @Column({ nullable: false, unique: true })
  permission_id: number;
}
