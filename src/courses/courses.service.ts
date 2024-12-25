import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
   constructor(private prisma: PrismaService) {}

   async getCourses() {
      try {
         const courses = await this.prisma.course.findMany({
            where: {
               is_special: false,
               is_active: true,
            },
         });

         return courses;
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
