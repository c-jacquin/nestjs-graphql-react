import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { LocalStrategy } from './local.strategy';

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
