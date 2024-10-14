import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
   getMessage(): any {
      return {
         status_code: 200,
         message: "The API is running. Let's Papocar!",
      };
   }
}
