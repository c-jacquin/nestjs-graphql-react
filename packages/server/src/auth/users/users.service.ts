import { FindManyOptions, FindOneOptions, Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserCreateInput } from 'auth/users/dto/user-create.input';
import { UserEntity } from 'auth/users/users.entity';
import { UsersArgs } from 'auth/users/dto/users.args';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getOne(options: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(options);
  }

  async get({ sortBy, skip, order, take, ...where }: UsersArgs = {}) {
    const query: FindManyOptions<UserEntity> = {
      skip,
      take,
      where,
    };

    if (sortBy) query.order = { [sortBy]: order };

    return this.userRepository.find(query);
  }

  async create(data: UserCreateInput) {
    const user = new UserEntity(data);

    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<UserEntity>) {
    const user = new UserEntity(data);
    if (data.count) user.count = data.count;

    return this.userRepository.update(id, user);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async count(options?: FindManyOptions<UserEntity>) {
    return this.userRepository.count(options);
  }
}
