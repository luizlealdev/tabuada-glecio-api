import { Controller, Get, Param, Res, Headers } from '@nestjs/common';
import { Response } from 'express';
import { AvatarsService } from './avatars.service';
import { CatchException } from '../utils/catch-exception';
import { join } from 'path';

@Controller('api/v1/avatars')
export class AvatarsController {
   constructor(private avatarsService: AvatarsService) {}

   exceptionCatcher = new CatchException();

   @Get('all')
   async getAvatars(@Res() res: Response) {
      try {
         const avatars = await this.avatarsService.getAvatars();

         return res.status(200).json({
            status_code: 200,
            message: 'Avatares listados com sucesso.',
            result: avatars,
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
   async getSpecificAvatar(
      @Headers('Authorization') auth: string,
      @Param('id') id,
      @Res() res: Response,
   ) {
      try {
         const avatar = await this.avatarsService.getSpecificAvatar(id, auth);

         return res.status(200).json({
            status_code: 200,
            message: 'Avatar buscado com sucesso.',
            result: avatar,
         });
      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }

   @Get(':size/:id')
   async getAvatarImage(
      @Param('size') size,
      @Param('id') id,
      @Res() res: Response,
   ) {
      return res.sendFile(
         join(
            process.cwd(),
            `uploads/images/avatars/${size}/avatar_${id}.webp`,
         ),
      );
   }
}
