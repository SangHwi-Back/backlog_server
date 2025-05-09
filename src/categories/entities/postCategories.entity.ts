import { Entity, PrimaryColumn } from 'typeorm';

@Entity('post_categories')
export class PostCategories {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  category_id: number;
}
