import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenUtils {
   constructor(private readonly service: JwtService) {}

   getDecodedToken(token: string): any {
      const splitToken = token.split(' ')[1];
      
      return this.service.decode(splitToken);
   }
}
