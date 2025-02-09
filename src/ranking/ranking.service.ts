import {
   BadRequestException,
   Body,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
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

   private cacheNormalRankingData = [];
   private cacheGlobalRankingData = [];

   async getAllRankingEntries(): Promise<any> {
      try {
         if (this.cacheNormalRankingData.length != 0) {
            console.log('Application: returning normal ranking cache entries');

            return this.cacheNormalRankingData;
         }

         const rankingEntries = await this.prisma.ranking.findMany({
            orderBy: {
               score: 'desc',
            },
            take: 60,
            select: {
               id: true,
               score: true,
               user: {
                  select: {
                     id: true,
                     name: true,
                     course_id: true,
                     course: {
                        select: {
                           name: true,
                        },
                     },
                     avatar_id: true,
                     avatar: {
                        select: {
                           path_128px: true,
                        },
                     },
                  },
               },
            },
         });

         this.cacheNormalRankingData = rankingEntries;
         return rankingEntries;
      } catch (err) {
         throw err;
      }
   }

   /* Global Ranking Entries */

   async getAllGlobalRankEntries(): Promise<any> {
      if (this.cacheGlobalRankingData.length != 0) {
         console.log('Application: returning global ranking cache entries');

         return this.cacheGlobalRankingData;
      }

      const rankingEntries = await this.prisma.ranking_global.findMany({
         orderBy: {
            score: 'desc',
         },
         take: 99,
         select: {
            id: true,
            score: true,
            user: {
               select: {
                  id: true,
                  name: true,
                  course_id: true,
                  course: {
                     select: {
                        name: true,
                     },
                  },
                  avatar_id: true,
                  avatar: {
                     select: {
                        path_128px: true,
                     },
                  },
               },
            },
         },
      });

      this.cacheGlobalRankingData = rankingEntries;
      return rankingEntries;
   }

   async setRankingEntry(auth: string, data: RankingEntry): Promise<any> {
      try {
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

         const currentUser = await this.prisma.user.findUnique({
            where: {
               id: decodedToken.sub,
            },
         });

         if (data.score > currentUser.max_score) {
            console.log('Application: setting global ranking entry');

            await this.prisma.ranking_global.upsert({
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

            await this.prisma.user.update({
               where: {
                  id: decodedToken.sub,
               },
               data: {
                  max_score: data.score,
               },
            });

            this.cacheGlobalRankingData = [];
         }

         this.cacheNormalRankingData = [];
         return newRankingEntry;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async resetNormalRank(auth: string) {
      try {
         const decodedToken = this.tokenUtils.getDecodedToken(auth);

         const admin = await this.prisma.user.findFirst({
            where: {
               email: decodedToken.email,
            },
         });

         if (!admin || !admin.is_admin)
            throw new UnauthorizedException(
               'Você não tem permissão para acessar este recurso.',
            );

         await this.prisma.ranking.deleteMany();
         this.cacheNormalRankingData = [];
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
