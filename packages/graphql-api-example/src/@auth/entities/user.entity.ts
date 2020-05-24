import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import { compare, hash } from 'bcrypt';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { WithDate, EmailScalar as Email, Roles } from 'shared';
import { RoleEntity } from './role.entity';
import { ListEntity } from '@todo/entities/list.entity';

const SALT = 10;

@ObjectType()
@Entity('user')
export class UserEntity extends WithDate {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Field(() => Email)
  @Column('varchar', { length: 50, unique: true })
  email?: string;

  @HideField()
  @Column('varchar', { length: 60 })
  password?: string;

  @Column('integer', { default: 0 })
  count?: number;

  @HideField()
  newPassword?: string;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
  )
  @JoinColumn({
    name: 'roleId',
  })
  role?: RoleEntity;

  @HideField()
  @Column('varchar')
  roleId?: string;

  @OneToMany(
    () => ListEntity,
    list => list.user,
  )
  lists?: ListEntity[];

  @BeforeInsert()
  async beforeInsert() {
    this.password = await hash(this.password, SALT);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.newPassword) {
      this.password = await hash(this.newPassword, SALT);
    }
  }

  authenticate(pass: string) {
    return compare(pass, this.password);
  }

  hasRole(roles: Roles[]) {
    return !!roles.find(item => item.toUpperCase() === this.role.name);
  }
}
