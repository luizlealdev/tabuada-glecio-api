import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterUser, LoginUser } from './dto/user.dto';
import { CatchException } from '../utils/catch-exception';

@Controller('api/v1/auth/local')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   exceptionCatcher = new CatchException();

   @Post('register')
   async register(@Res() res: Response, @Body() data: RegisterUser) {
      try {
         const result = await this.authService.register(data);

         return res.status(201).json({
            status_code: 201,
            message: 'User Created Successfully',
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

   @Post('login')
   async login(@Res() res: Response, @Body() data: LoginUser) {
      try {
         const result = await this.authService.login(data);

         return res.status(200).json({
            status_code: 200,
            message: 'User Logged Successfully',
            result: result,
         });
      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);

         //console.log(res.json({err}))

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }
}
