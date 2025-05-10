import { Entity, PrimaryColumn } from 'typeorm';
import { BacklogBaseModel } from '../../common/typeorm/BacklogBaseModel';

@Entity('tags')
export class TagsModel extends BacklogBaseModel {
  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  color_hex: string;
}
