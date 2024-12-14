import { Controller, Get, Res } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CatchException } from "../utils/catch-exception";
import { Response } from "express";

@Controller('api/v1/courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

 exceptionCatcher = new CatchException();

   @Get('all')
   async getAvatars(@Res() res: Response) {
      try {
         const courses = await this.coursesService.getCourses();

         return res.status(200).json({
            status_code: 200,
            message: 'Courses List Fetched Sucessfully',
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
}