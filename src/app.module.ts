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

@Module({
   imports: [AuthModule, PrismaModule, UserModule, ScheduleModule.forRoot()],
   controllers: [AppController, AuthController, RankingController],
   providers: [AppService, UserService, AuthService, RankingService, CronService],
})
export class AppModule {}
