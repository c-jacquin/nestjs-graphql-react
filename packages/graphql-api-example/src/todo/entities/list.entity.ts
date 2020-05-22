import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { TodoEntity } from './todo.entity';
import { WithDate } from 'core';

@ObjectType()
@Entity('list')
export class ListEntity extends WithDate {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	readonly id?: string

	@Column('varchar', { length: 30, unique: true })
	label?: string

	@Column('varchar', { length: 500, nullable: true })
	description?: string
	
	@Field(() => TodoEntity)
  @OneToMany(() => TodoEntity, todo => todo.parent)
	todos?: TodoEntity[]
}
