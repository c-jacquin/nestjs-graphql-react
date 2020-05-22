import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { TodoEntity } from './todo.entity';

@ObjectType()
@Entity('list')
export class ListEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('increment')
	readonly id?: number

	@Column('varchar', { length: 500, unique: true })
	label?: string

	@Column('varchar', { length: 500, nullable: true })
	description?: string
	
	@Field(() => TodoEntity)
  @OneToMany(() => TodoEntity, todo => todo.parent)
  todos?: TodoEntity[]
}
