import { Res } from '@nestjs/common';
import { Response } from 'express';

export class CatchException {
   catch(err: any) {
      const status = err?.status || 500;
      const message = err?.response?.message || 'Internal Server Error';

      return {
         status_code: status,
         message: message,
      };
   }
}
