import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenUtils } from '../utils/token-utils';

@Injectable()
export class CoursesService {
   constructor(
      private prisma: PrismaService,
      private readonly jwtService: JwtService,
   ) {}

   tokenUtils = new TokenUtils(this.jwtService);

   async getCourses(auth: string): Promise<any> {
      try {
         const decodedToken = this.tokenUtils.getDecodedToken(auth || '');

         const isAdmin = decodedToken?.sub
            ? !!(
                 await this.prisma.user.findUnique({
                    where: { id: decodedToken.sub },
                    select: { is_admin: true },
                 })
              )?.is_admin
            : false;

         let courses;

         if (isAdmin) {
            courses = await this.prisma.course.findMany({
               where: {
                  is_active: true,
               },
            });
         } else {
            courses = await this.prisma.course.findMany({
               where: {
                  is_special: false,
                  is_active: true,
               },
            });
         }

         return courses;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }

   async getSpecificCourse(id: string, auth: string): Promise<any> {
      try {
         const decodedToken = this.tokenUtils.getDecodedToken(auth || '');

         const isAdmin = decodedToken?.sub
            ? !!(
                 await this.prisma.user.findUnique({
                    where: { id: decodedToken.sub },
                    select: { is_admin: true },
                 })
              )?.is_admin
            : false;

         let course;

         if (isAdmin) {
            course = await this.prisma.course.findMany({
               where: {
                  is_active: true,
                  id: Number(id),
               },
            });
         } else {
            course = await this.prisma.course.findMany({
               where: {
                  is_special: false,
                  is_active: true,
                  id: Number(id),
               },
            });
         }

         if (course.length === 0)
            throw new NotFoundException('Turma ou curso não encontrado');

         return course;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
