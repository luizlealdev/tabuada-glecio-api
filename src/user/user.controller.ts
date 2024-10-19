import { Body, Controller, Put,  Headers, Res, UseGuards, Get, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { CatchException } from 'src/utils/catch-exception';
import { UserService } from './user.service';
import { UpdatePaswordUser, UpdateUser } from './dto/user-updates.dto';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   exceptionCatcher = new CatchException();

   @Get(':id')
   @UseGuards(JwtAuthGuard)
   async getUser(@Param('id') userId, @Res() res: Response) {
      try {

         const result = await this.userService.getUser(Number(userId));

         return res.status(200).json({
            status_code: 200,
            message: 'User Fetched Successfully',
            result: result,
         });

      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }

   @Put('update')
   @UseGuards(JwtAuthGuard)
   async updateUser(
      @Res() res: Response,
      @Headers('Authorization') auth: string,
      @Body() data: UpdateUser,
   ) {
      try {
         const result = await this.userService.updateUser(auth, data);

         return res.status(200).json({
            status_code: 200,
            message: 'User Updated Successfully',
            result: result,
         });
      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }

   @Put('update/password')
   @UseGuards(JwtAuthGuard)
   async updateUserPassword(
      @Res() res: Response,
      @Headers('Authorization') auth: string,
      @Body() data: UpdatePaswordUser,
   ) {
      try {
         await this.userService.updateUserPassword(auth, data);

         return res.status(200).json({
            status_code: 200,
            message: 'User Password Updated Successfully',
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
