import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtTempStrategy extends PassportStrategy(Strategy, 'jwt-temp') {
   constructor(private readonly prisma: PrismaService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: process.env.JWT_TEMP_SECRET,
      });
   }

   async validate(payload: { email: string }) {
      const user = await this.prisma.user.findUnique({
         where: { email: payload.email },
      });

      if (!user) {
         throw new UnauthorizedException('User Not Found');
      }

      return user;
   }
}
