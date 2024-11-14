import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvatarsService {
   constructor(private prisma: PrismaService) {}

   async getAvatars(): Promise<any> {
      try {
         const avatars = await this.prisma.avatar.findMany({
            where: {
               is_special: false,
            },
         });

         return avatars;
      } catch (err) {
         console.error(err);
         throw new InternalServerErrorException('Error Fetching Avatars');
      }
   }
}
