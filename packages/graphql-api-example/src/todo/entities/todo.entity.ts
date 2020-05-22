import { ObjectType, Int, Field, HideField, ID } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

import { ListEntity } from './list.entity'

@ObjectType()
@Entity('todo')
export class TodoEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn('increment')
	readonly id: number

	@Column('varchar', { length: 500, unique: true })
	label: string

	@Column('varchar', { length: 500, nullable: true })
	description: string
	
	@HideField()
	@ManyToOne(() => ListEntity, list => list.todos,  { onDelete: 'CASCADE' })
	@JoinColumn({
		name: 'parentId'
	})
	parent?: ListEntity;
	
	@Field(() => Int)
	@Column('number')
	parentId: number;
}
