import {
   Body,
   ConflictException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUser } from '../auth/dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TokenUtils } from '../utils/token-utils';
import { UpdatePaswordUser, UpdateUser } from './dto/user-updates.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
   ) {}

   tokenUtils = new TokenUtils(this.jwtService);

   async getUser(userId: number): Promise<any> {
      try {
         const user = await this.prisma.user.findUnique({
            where: {
               id: userId,
            },
            select: {
               id: true,
               name: true,
               max_score: true,
               created_at: true,
               is_admin: true,
               course: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
               avatar: {
                  select: {
                     id: true,
                     path_default: true,
                     path_256px: true,
                     path_128px: true,
                  },
               },
            },
         });

         if (!user) throw new NotFoundException('O usuário solicitado não foi encontrado.');

         return user;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async createUser(data: RegisterUser): Promise<any> {
      try {
         const existentUser = await this.prisma.user.findUnique({
            where: {
               email: data.email,
            },
         });

         if (existentUser != null)
            throw new ConflictException('Já existe um usuário com este e-mail.');

         return await this.prisma.user.create({
            data,
            include: {
               course: {
                  select: {
                     name: true,
                  },
               },
               avatar: {
                  select: {
                     path_default: true,
                     path_256px: true,
                     path_128px: true,
                  },
               },
            },
         });
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async updateUser(auth: string, @Body() data: UpdateUser): Promise<any> {
      try {
         const decodedToken = this.tokenUtils.getDecodedToken(auth);

         const user = await this.prisma.user.update({
            data: {
               name: data.name,
               course_id: data.course_id,
               avatar_id: data.avatar_id,
            },
            select: {
               id: true,
               name: true,
               course: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
               avatar: {
                  select: {
                     id: true,
                     path_default: true,
                     path_256px: true,
                     path_128px: true,
                  },
               },
            },
            where: {
               email: decodedToken.email,
            },
         });

         if (!user) throw new NotFoundException('O usuário não foi encontrado.');

         return user;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async updateUserPassword(auth: string, @Body() data: UpdatePaswordUser) {
      try {
         const decodedToken = this.tokenUtils.getDecodedToken(auth);

         const user = await this.prisma.user.findUnique({
            where: {
               id: decodedToken.sub,
            },
         });

         if (!user) {
            throw new UnauthorizedException('O usuário não foi encontrado.');
         }

         const passwordMatches = await bcrypt.compare(
            data.old_password,
            user.password,
         );
         if (!passwordMatches) {
            throw new UnauthorizedException('Senha incorreta. Tente novamente');
         }

         const newPasswordHash = await bcrypt.hash(data.new_password, 10);

         await this.prisma.user.update({
            data: {
               password: newPasswordHash,
            },
            where: {
               id: decodedToken.sub,
            },
         });
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
