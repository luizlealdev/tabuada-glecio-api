import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
   imports: [
      JwtModule.register({
         global: true,
         secret: process.env.JWT_SECRET, 
         signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
   ],
   providers: [AuthService, UserService, PrismaService, JwtStrategy],
   controllers: [AuthController],
})
export class AuthModule {}
