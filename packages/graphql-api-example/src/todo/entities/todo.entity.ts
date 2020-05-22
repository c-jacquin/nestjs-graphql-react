import { ObjectType, Int, Field, HideField, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

import { ListEntity } from './list.entity'
import { WithDate } from 'core'

@ObjectType()
@Entity('todo')
export class TodoEntity extends WithDate {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	readonly id?: string

	@Column('varchar', { length: 30, unique: true })
	label?: string

	@Column('varchar', { length: 500, nullable: true })
	description?: string
	
	@HideField()
	@ManyToOne(() => ListEntity, list => list.todos,  { onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'parentId'
	})
	parent?: ListEntity;
	
	@Field(() => Int)
	@Column('number')
	parentId?: number;
}
