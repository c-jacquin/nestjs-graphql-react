import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';

import { UserEntity } from '@auth/entities/user.entity';
import { SignUpInput } from '@auth/dto/signUp.input';
import { UsersQueryInput } from '@auth/dto/user.input';
import { Roles } from 'shared';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getOne(option: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne(option);
  }

  async get({ sortBy, skip, order, take, ...where }: UsersQueryInput = {}) {
    const query: FindManyOptions<UserEntity> = {
      skip,
      take,
      where,
      relations: ['role'],
    };

    if (sortBy) query.order = { [sortBy]: order };

    return this.userRepository.find(query);
  }

  async create(data: SignUpInput) {
    const user = new UserEntity();
    user.email = data.email;
    user.password = data.password;
    user.roleId = Roles.NORMAL;

    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<Omit<UserEntity, 'id'>>) {
    return this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
