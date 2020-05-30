import { Field, HideField, ObjectType, ID } from '@nestjs/graphql';
import { Entity, OneToMany, PrimaryColumn, Column } from 'typeorm';

import { Roles } from '@app/common';
import { UserEntity } from 'auth/users/users.entity';

@ObjectType()
@Entity('role')
export class RoleEntity {
  @Field(() => ID)
  @PrimaryColumn('varchar', { enum: Roles, unique: true })
  public name?: string;

  @Field(() => String)
  @Column('varchar', { length: '200', nullable: true })
  public description?: string;

  @HideField()
  @OneToMany(
    () => UserEntity,
    user => user.role,
    {
      cascade: true,
    },
  )
  public users?: UserEntity[];
}
