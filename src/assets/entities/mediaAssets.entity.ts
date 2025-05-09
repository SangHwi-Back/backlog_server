import { Column, Entity } from 'typeorm';
import { BacklogBaseModel } from '../../common/BacklogBaseModel';

@Entity('media_assets')
export class MediaAssets extends BacklogBaseModel {
  @Column({ unique: true, nullable: false })
  asset_id: string;

  @Column({ nullable: false })
  original_filename: string;

  @Column({ unique: true, nullable: false })
  cdn_url: string;

  @Column({ type: 'integer', nullable: false })
  file_size: number;

  @Column({ nullable: true })
  mime_type: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploaded_at: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  is_cached: boolean;

  @Column({ type: 'timestamp', nullable: true })
  cache_expiry: Date;

  @Column({ default: 'hot', nullable: true })
  storage_tier: string;
}
