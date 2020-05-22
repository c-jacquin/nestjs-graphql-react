import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import { compare, hash } from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'

import { WithDate, EmailScalar as Email } from 'core';

const SALT = 10;

@ObjectType()
@Entity('user')
export class UserEntity extends WithDate {
	@Field(() => ID)
	@PrimaryGeneratedColumn('uuid')
	readonly id?: string

  @Field(() => Email)
	@Column('varchar', { length: 20, unique: true })
	email?: string

  @HideField()
	@Column('varchar', { length: 20})
  password?: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, SALT);
  }

  authenticate(pass: string) {
    return compare(pass, this.password);
  }
}
