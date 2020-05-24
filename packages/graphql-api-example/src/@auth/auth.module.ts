import { Module, HttpModule, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { RolesFixture } from './fixtures/roles.fixture.service';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { ExpiredAccessTokenFilter } from './exceptions/expired-access-token.filter';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [
    RolesFixture,
    AuthService,
    AuthResolver,
    ExpiredAccessTokenFilter,
    JwtStrategy,
    UsersResolver,
    UsersService,
  ],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    @Inject(RolesFixture) private readonly rolesFixture: RolesFixture,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async onModuleInit() {
    try {
      await this.rolesFixture.insertData();
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
