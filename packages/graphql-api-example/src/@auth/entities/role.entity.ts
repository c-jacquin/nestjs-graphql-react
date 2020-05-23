import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@ObjectType()
@Entity('role')
export class RoleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  public name: string;

  @OneToMany(
    () => UserEntity,
    user => user.role,
    {
      cascade: ['insert', 'update'],
    },
  )
  public users?: UserEntity[];
}
