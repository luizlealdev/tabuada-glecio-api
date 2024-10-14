import {
   Body,
   Controller,
   Delete,
   Get,
   Post,
   Req,
   Res,
   UseGuards,
} from '@nestjs/common';
import { retry } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { RankingService } from './ranking.service';
import { Request, Response } from 'express';
import { RankingEntry } from './dto/ranking-entry.dto';
import { CatchException } from 'src/utils/catch-exception';

@Controller('ranking')
export class RankingController {
   constructor(private rankingService: RankingService) {}

   exceptionCatcher = new CatchException()

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
   @Post('normal')
   async setRankingEntry(
      @Req() req: Request,
      @Res() res: Response,
      @Body() data: RankingEntry,
   ) {
      try {
         const auth = req.headers.authorization;
         const result = await this.rankingService.setRankingEntry(
            auth,
            data,
         );

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
   @Delete('normal')
   async resetNormalRank(@Req() req: Request, @Res() res: Response) {
      try {
         const auth = req.headers.authorization;

         await this.rankingService.resetNormalRank(auth);

         return res.status(200).json({
            status_code: 200,
            message: 'Ranking Entries Deleted Successfully',
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
   @Post('global')
   async setGlobalRankingEntry(
      @Req() req: Request,
      @Res() res: Response,
      @Body() data: RankingEntry,
   ) {
      try {
         const auth = req.headers.authorization;
         const result = await this.rankingService.setGlobalRankingEntry(
            auth,
            data,
         );

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
}
