import { Controller, Get, Param, Res, Headers } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CatchException } from '../utils/catch-exception';
import { Response } from 'express';

@Controller('api/v1/courses')
export class CoursesController {
   constructor(private coursesService: CoursesService) {}

   exceptionCatcher = new CatchException();

   @Get('all')
   async getAvatars(
      @Headers('Authorization') auth: string,
      @Res() res: Response,
   ) {
      try {
         const courses = await this.coursesService.getCourses(auth);

         return res.status(200).json({
            status_code: 200,
            message: 'Cursos listados com sucesso.',
            result: courses,
         });
      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }

   @Get('id/:id')
   async getSpecificCourse(
      @Headers('Authorization') auth: string,
      @Param('id') id,
      @Res() res: Response,
   ) {
      try {
         const course = await this.coursesService.getSpecificCourse(id, auth);

         return res.status(200).json({
            status_code: 200,
            message: 'Curso buscado com sucesso.',
            result: course,
         });
      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }
}
