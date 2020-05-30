import { Field, HideField, ID, ObjectType, Int } from '@nestjs/graphql';
import { compare, hash } from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Roles } from '@app/common';
import { WithDate } from 'common/_utils';
import { EmailScalar as Email } from 'common/email/email.scalar';
import { RoleEntity } from 'auth/users/roles/roles.entity';
import { UserCreateInput } from './dto/user-create.input';

const SALT = 10;

@ObjectType()
@Entity('user')
export class UserEntity extends WithDate {
  constructor(data?: Partial<UserCreateInput>) {
    super();

    if (data) {
      if (data.email) this.email = data.email;
      if (data.password) this.password = data.password;
      if (data.role) this.role = data.role;
    }
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field(() => Email, { nullable: true })
  @Column('varchar', { length: 50, unique: true })
  email?: string;

  @HideField()
  @Column('varchar', { length: 200 })
  password?: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { default: 0 })
  count?: number;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
  )
  @Field(() => Roles)
  @Column('varchar', { default: Roles.NORMAL, length: 30 })
  role?: Roles;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password, SALT);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.password) {
      this.password = await hash(this.password, SALT);
    }
  }

  authenticate(pass: string) {
    return compare(pass, this.password);
  }

  hasRole(roles: Roles[]) {
    return !!roles.find(item => item === this.role);
  }
}
