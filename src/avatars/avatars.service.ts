import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AvatarsService {
   constructor(private prisma: PrismaService) {}

   async getAvatars(): Promise<any> {
      try {
         const avatars = await this.prisma.avatar.findMany({
            where: {
               is_special: false,
            },
            select: {
               id: true,
               path_default: true,
               path_256px: true,
               path_128px: true
            }
         });

         return avatars;
      } catch (err) {
         console.error(err);
         throw new InternalServerErrorException('Error Fetching Avatars');
      }
   }
}
