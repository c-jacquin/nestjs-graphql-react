import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { TodoEntity } from './todo.entity';

@Entity('list')
export class ListEntity {
	@PrimaryGeneratedColumn('increment') id: number

	@Column('varchar', { length: 500, unique: true })
	label: string

	@Column('varchar', { length: 500, nullable: true })
	description?: string
  
  @OneToMany(() => TodoEntity, todo => todo.parent, { nullable: true })
  todos: TodoEntity[]
}
