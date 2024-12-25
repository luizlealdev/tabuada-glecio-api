import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
   getMessage(): any {
      return {
         status_code: 200,
         message: "A API está rodando. Vamos papocar!",
      };
   }
}
