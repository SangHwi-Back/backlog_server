import { BacklogBaseModel } from '../../common/BacklogBaseModel';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UsersModel } from '../../auth/entities/users.entity';

@Entity('sidebar_categories')
export class SidebarCategories extends BacklogBaseModel {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  display_order: number;

  @Column({ type: 'integer', nullable: true })
  parent_category_id: number;

  @Column({ type: 'integer', nullable: false })
  createdBy: number;

  @OneToOne(() => UsersModel)
  @JoinColumn({ name: 'createdBy' })
  creator: UsersModel;

  @OneToOne(() => SidebarCategories, { nullable: true })
  @JoinColumn({ name: 'parent_category_id' })
  parentCategory: SidebarCategories;
}
