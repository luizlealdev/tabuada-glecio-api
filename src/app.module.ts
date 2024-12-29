import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RankingController } from './ranking/ranking.controller';
import { RankingService } from './ranking/ranking.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { UserController } from './user/user.controller';
import { AvatarsService } from './avatars/avatars.service';
import { AvatarsController } from './avatars/avatars.controller';
import { CoursesController } from './courses/courses.controller';
import { CoursesService } from './courses/courses.service';
import { MailModule } from './mail/mail.module';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_GUARD } from '@nestjs/core';

@Module({
   imports: [
      AuthModule,
      PrismaModule,
      UserModule,
      MailModule,
      RateLimiterModule,
      ScheduleModule.forRoot(),
   ],
   controllers: [
      AppController,
      AuthController,
      RankingController,
      UserController,
      AvatarsController,
      CoursesController,
   ],
   providers: [
      AppService,
      UserService,
      AuthService,
      RankingService,
      CronService,
      AvatarsService,
      CoursesService,
      {
         provide: APP_GUARD,
         useClass: RateLimiterGuard
      }
   ],
})
export class AppModule {}
