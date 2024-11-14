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
               class: true,
               max_score: true,
               created_at: true,
               is_admin: true,
               avatar: true,
            },
         });

         if (!user) throw new NotFoundException('User Not Found');

         return user;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async createUser(data: RegisterUser): Promise<RegisterUser> {
      try {
         const existentUser = await this.prisma.user.findUnique({
            where: {
               email: data.email,
            },
         });

         if (existentUser != null)
            throw new ConflictException('User already exists');

         return await this.prisma.user.create({
            data,
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
               class: data.class,
               avatar_id: data.avatar_id
            },
            select: {
               id: true,
               name: true,
               class: true,
               avatar: true
            },
            where: {
               email: decodedToken.email,
            },
         });

         if (!user) throw new NotFoundException('User Not Found');

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
            throw new UnauthorizedException('User Not Found');
         }

         const passwordMatches = await bcrypt.compare(
            data.old_password,
            user.password,
         );
         if (!passwordMatches) {
            throw new UnauthorizedException('Incorrect Password');
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
