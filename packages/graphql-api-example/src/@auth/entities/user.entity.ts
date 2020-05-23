import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import { compare, hash,  } from 'bcrypt';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'

import { WithDate, EmailScalar as Email } from 'shared';

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

  @Column('integer', { default: 0 })
  count: number;

  @HideField()
  newPassword: string;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password, SALT);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.newPassword) {
      this.password = await hash(this.newPassword, SALT)
    }
  }

  authenticate(pass: string) {
    return compare(pass, this.password);
  }
}
