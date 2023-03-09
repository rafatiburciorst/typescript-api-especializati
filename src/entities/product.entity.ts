import {
  Entity, PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn
} from "typeorm"

@Entity('products')
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  weight: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}
