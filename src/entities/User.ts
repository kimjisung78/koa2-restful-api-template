import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "num",
  })
  num: number;

  @Column({
    type: "varchar",
    name: "name",
    length: 11,
  })
  name: string;

  @Column({
    type: "varchar",
    name: "id",
    length: 10,
  })
  id: string;

  @Column({
    type: "varchar",
    name: "pw",
    length: 16,
    nullable: true
  })
  pw?: string;

  @CreateDateColumn({
    type: "timestamp",
    name: "createdAt",
  })
  createdAt: Date;
}
