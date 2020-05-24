import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

import { RoleEntity } from '@auth/entities/role.entity';
import { UserEntity } from '@auth/entities/user.entity';
import { Roles, Env } from 'shared';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesFixture {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(ConfigService) private readonly config: ConfigService,
  ) {}

  async insertData() {
    const usersLength = await this.userRepository.count();

    if (usersLength === 0) {
      return Promise.all(
        Object.keys(Roles).map(async role => {
          const roleCount = await this.roleRepository.count({
            name: role,
          });

          if (roleCount === 0) {
            const roleEntity = new RoleEntity();
            roleEntity.name = role;
            const newRole = await this.roleRepository.save(roleEntity);

            this.logger.info(`Role ${newRole.name} created !`);

            if (newRole.name === Roles.ADMIN) {
              const userCount = await this.userRepository.count({
                email: this.config.get(Env.ADMIN_EMAIL),
              });

              if (userCount === 0) {
                const userEntity = new UserEntity();

                userEntity.email = this.config.get(Env.ADMIN_EMAIL);
                userEntity.password = this.config.get(Env.ADMIN_PASS);
                userEntity.role = newRole;

                await this.userRepository.save(userEntity);

                this.logger.info('Admin user created !');
              }
            }
          }
        }),
      );
    }
  }
}
