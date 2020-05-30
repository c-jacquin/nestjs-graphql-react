import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from 'common/common.module';
import { UserEntity } from 'auth/users/users.entity';
import { UsersResolver } from 'auth/users/users.resolver';
import { UsersService } from 'auth/users/users.service';
import { RoleEntity } from 'auth/users/roles/roles.entity';
import { RolesFixture } from 'auth/users/roles/fixture/fixture.service';
import { LocalRolesGuard } from './roles/roles.guard';
import { RolesGuard } from 'common/roles/roles.guard';
import { RolesService } from './roles/roles.service';
import { UsersFixture } from './fixture/fixture.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from 'common/_utils';
import { NodeEnv } from '@app/common';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    ConfigModule,
  ],
  providers: [
    RolesFixture,
    UsersResolver,
    UsersService,
    { provide: RolesGuard, useClass: LocalRolesGuard },
    RolesService,
    UsersFixture,
  ],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(
    private readonly usersFixture: UsersFixture,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.config.get(Env.NODE_ENV) !== NodeEnv.TEST) {
      await this.usersFixture.exec();
    }
  }
}
