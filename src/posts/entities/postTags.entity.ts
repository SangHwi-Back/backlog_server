import { Entity, PrimaryColumn } from 'typeorm';

@Entity('post_tags')
export class PostTagsModel {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  tag_id: number;
}
