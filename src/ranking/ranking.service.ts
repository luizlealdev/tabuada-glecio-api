import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RankingEntry } from './dto/ranking-entry.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenUtils } from 'src/utils/token-utils';

@Injectable()
export class RankingService {
   constructor(
      private prisma: PrismaService,
      private readonly jwtService: JwtService,
   ) {}

   tokenUtils = new TokenUtils(this.jwtService);

   async getAllRankingEntries(): Promise<any> {
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

      return rankingEntries;
   }

   async setRankingEntry(
      auth: string,
      @Body() data: RankingEntry,
   ): Promise<any> {
      const decodedToken = this.tokenUtils.getDecodedToken(auth);

      const existentRankEntry = await this.prisma.ranking.findFirst({
         where: {
            user_id: decodedToken.sub,
         },
      });

      let newRankingEntry;

      if (!existentRankEntry) {
         console.log('Creating new ranking entry');

         newRankingEntry = await this.prisma.ranking.create({
            data: {
               score: data.score,
               user_id: decodedToken.sub,
            },
            select: {
               score: true,
               user_id: true,
            },
         });
      } else {
         console.log('Updating existing ranking entry');

         newRankingEntry = await this.prisma.ranking.update({
            data: {
               score: data.score,
            },
            select: {
               score: true,
               user_id: true,
            },
            where: {
               id: existentRankEntry.id,
            },
         });
      }

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

      return rankingEntries;
   }

   async setGlobalRankingEntry(
      auth: string,
      @Body() data: RankingEntry,
   ): Promise<any> {
      const decodedToken = this.tokenUtils.getDecodedToken(auth);

      const existentRankEntry = await this.prisma.ranking_global.findFirst({
         where: {
            user_id: decodedToken.sub,
         },
      });

      let newRankingEntry;

      if (!existentRankEntry) {
         console.log('Creating new global ranking entry');

         newRankingEntry = await this.prisma.ranking_global.create({
            data: {
               score: data.score,
               user_id: decodedToken.sub,
            },
            select: {
               score: true,
               user_id: true,
            },
         });
      } else {
         console.log('Updating existing global ranking entry');

         if (existentRankEntry.score <= data.score) {
            newRankingEntry = await this.prisma.ranking_global.update({
               data: {
                  score: data.score,
               },
               select: {
                  score: true,
                  user_id: true,
               },
               where: {
                  id: existentRankEntry.id,
               },
            });
         }
      }

      return newRankingEntry;
   }
}
