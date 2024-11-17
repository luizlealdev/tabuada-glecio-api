import {
   Body,
   Controller,
   Delete,
   Get,
   Post,
   Res,
   UseGuards,
   Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { RankingService } from './ranking.service';
import { Response } from 'express';
import { RankingEntry } from './dto/ranking-entry.dto';
import { CatchException } from '../utils/catch-exception';

@Controller('api/v1/ranking')
export class RankingController {
   constructor(private rankingService: RankingService) {}

   exceptionCatcher = new CatchException();

   @UseGuards(JwtAuthGuard)
   @Get('normal')
   async getAllRankingEntries(@Res() res: Response) {
      try {
         const result = await this.rankingService.getAllRankingEntries();

         return res.status(200).json({
            status_code: 200,
            message: 'Ranking Entries Fetched Successfully',
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

   @UseGuards(JwtAuthGuard)
   @Get('global')
   async getAllGlobalRankingEntries(@Res() res: Response) {
      try {
         const result = await this.rankingService.getAllGlobalRankEntries();

         return res.status(200).json({
            status_code: 200,
            message: 'Ranking Entries Fetched Successfully',
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

   @UseGuards(JwtAuthGuard)
   @Post()
   async setRankingEntry(
      @Headers('Authorization') auth: string,
      @Res() res: Response,
      @Body() data: RankingEntry,
   ) {
      try {
         const result = await this.rankingService.setRankingEntry(auth, data);

         return res.status(201).json({
            status_code: 201,
            message: 'Ranking Entry Created Successfully',
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

   @UseGuards(JwtAuthGuard)
   @Delete()
   async resetNormalRank(
      @Headers('Authorization') auth: string,
      @Res() res: Response,
   ) {
      try {
         await this.rankingService.resetNormalRank(auth);

         return res.status(200).json({
            status_code: 200,
            message: 'Ranking Entries Deleted Successfully',
         });
      } catch (err) {
         const exceptionInfo = this.exceptionCatcher.catch(err);
         console.log(exceptionInfo);

         return res.status(exceptionInfo.status_code).json({
            status_code: exceptionInfo.status_code,
            message: exceptionInfo.message,
         });
      }
   }
}
