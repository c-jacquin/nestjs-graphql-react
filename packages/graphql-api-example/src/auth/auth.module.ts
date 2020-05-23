import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Env } from '@shared';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlAuthGuard } from './guards/graphql.guard';
import { ExpiredAccessTokenFilter } from './exceptions/expired-access-token.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get(Env.JWT_SECRET),
          signOptions: {
            expiresIn: config.get(Env.ACCESS_TOKEN_DURATION),
          },
        };
      },
      inject: [ConfigService],
    }),
    HttpModule.register({}),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    GqlAuthGuard,
    ExpiredAccessTokenFilter,
  ],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
