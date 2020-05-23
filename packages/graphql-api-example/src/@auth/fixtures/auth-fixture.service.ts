import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

import { RoleEntity } from '@auth/entities/role.entity';
import { UserEntity } from '@auth/entities/user.entity';
import { Roles } from 'shared';

const userData = {
  email: 'admin@admin.com',
  password: 'admin'
};

@Injectable()
export class AuthFixture {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public async insertData() {
    const usersLength = await this.userRepository.count();

    if (usersLength === 0) {
      let user: UserEntity;

      user = await this.userRepository.findOne(userData);

      if (!user) {
        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.password = userData.password;

        user = await this.userRepository.save(userEntity);

        this.logger.info('Admin user created !');
      }

      return Promise.all(
        Object.keys(Roles).map(async (role) => {
          let existingRole = await this.roleRepository.findOne({ name: role });

          if (!existingRole) {
            existingRole = await this.roleRepository.save({ name: role });

            this.logger.info(`Role ${existingRole.name} created !`);

            if (existingRole.name === Roles.ADMIN) {
              user.role = existingRole;
              
              this.logger.info('Admin role added to admin user !');
  
              return this.userRepository.save(user);
            }
          }
        })
        .filter(Boolean)
      );
    } else {
      return Promise.resolve();
    }
  }
}
