import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

import { ListEntity } from './list.entity'


@Entity('todo')
export class TodoEntity {
	@PrimaryGeneratedColumn('increment') id: number

	@Column('varchar', { length: 500, unique: true })
	label: string

	@Column('varchar', { length: 500, nullable: true })
	description: string
  
	@ManyToOne(() => ListEntity, list => list.todos)
	@JoinColumn({
		name: 'parentId'
	})
	parent?: ListEntity;
	
	@Column('number')
	parentId: number;
}
