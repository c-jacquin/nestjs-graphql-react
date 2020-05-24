import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TodoEntity } from './todo.entity';
import { WithDate } from 'shared';
import { UserEntity } from '@auth/entities/user.entity';

@ObjectType()
@Entity('list')
export class ListEntity extends WithDate {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Column('varchar', { length: 30, unique: true })
  label?: string;

  @Column('varchar', { length: 500, nullable: true })
  description?: string;

  @Field(() => TodoEntity)
  @OneToMany(
    () => TodoEntity,
    todo => todo.parent,
  )
  todos?: TodoEntity[];

  @HideField()
  @JoinColumn({
    name: 'userId',
  })
  @ManyToOne(
    () => UserEntity,
    user => user.lists,
  )
  user?: UserEntity;

  @HideField()
  @Column('varchar')
  userId?: string;
}
