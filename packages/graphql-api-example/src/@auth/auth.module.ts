import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { ExpiredAccessTokenFilter } from './exceptions/expired-access-token.filter';
import { GqlAuthGuard } from './guards/graphql.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Env } from 'shared';

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
    HttpModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    ExpiredAccessTokenFilter,
  ],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}
