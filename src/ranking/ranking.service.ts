import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RankingEntry } from './dto/ranking-entry.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenUtils } from '../utils/token-utils';

@Injectable()
export class RankingService {
   constructor(
      private prisma: PrismaService,
      private readonly jwtService: JwtService,
   ) {}

   tokenUtils = new TokenUtils(this.jwtService);

   private cacheNormalRankingResult = [];
   private cacheGlobalRankingResult = [];

   async getAllRankingEntries(): Promise<any> {
      if (this.cacheNormalRankingResult.length != 0) {
         console.log('Application: returning normal ranking cache entries');

         return this.cacheNormalRankingResult;
      }

      const rankingEntries = await this.prisma.ranking.findMany({
         orderBy: {
            score: 'desc',
         },
         select: {
            id: true,
            score: true,
            user: {
               select: {
                  id: true,
                  name: true,
                  class: true,
               },
            },
         },
      });

      this.cacheNormalRankingResult = rankingEntries;
      return rankingEntries;
   }

   async setRankingEntry(auth: string, data: RankingEntry): Promise<any> {
      const decodedToken = this.tokenUtils.getDecodedToken(auth);

      const newRankingEntry = this.prisma.ranking.upsert({
         where: {
            user_id: decodedToken.sub,
         },
         update: {
            score: data.score,
         },
         create: {
            score: data.score,
            user_id: decodedToken.sub,
         },
         select: {
            score: true,
            user_id: true,
         },
      });

      this.cacheNormalRankingResult = [];
      return newRankingEntry;
   }

   async resetNormalRank(auth: string) {
      const decodedToken = this.tokenUtils.getDecodedToken(auth);

      const admin = await this.prisma.user.findFirst({
         where: {
            email: decodedToken.email,
         },
      });

      if (!admin || !admin.is_admin)
         throw new UnauthorizedException('Unauthorized to reset the rank');

      await this.prisma.ranking.deleteMany();
   }

   /* Global Ranking Entries */

   async getAllGlobalRankEntries(): Promise<any> {
      if (this.cacheGlobalRankingResult.length != 0) {
         console.log('Application: returning global ranking cache entries');

         return this.cacheGlobalRankingResult;
      }

      const rankingEntries = await this.prisma.ranking_global.findMany({
         orderBy: {
            score: 'desc',
         },
         take: 100,
         select: {
            id: true,
            score: true,
            user: {
               select: {
                  id: true,
                  name: true,
                  class: true,
               },
            },
         },
      });

      this.cacheGlobalRankingResult = rankingEntries;
      return rankingEntries;
   }

   async setGlobalRankingEntry(auth: string, data: RankingEntry): Promise<any> {
      const decodedToken = this.tokenUtils.getDecodedToken(auth);


      const newRankingEntry = this.prisma.ranking_global.upsert({
         where: {
            user_id: decodedToken.sub,
         },
         update: {
            score: data.score,
         },
         create: {
            score: data.score,
            user_id: decodedToken.sub,
         },
         select: {
            score: true,
            user_id: true,
         },
      });;

      this.cacheGlobalRankingResult = []
      return newRankingEntry;
   }
}
