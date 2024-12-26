import {
   ExecutionContext,
   Injectable,
   UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   handleRequest<TUser = any>(
      err: any,
      user: any,
      info: any,
      context: ExecutionContext,
      status?: any,
   ): TUser {
      if (err || !user) {
         if (info?.message === 'invalid token') {
            throw new UnauthorizedException(
               'Token inválido. Por favor, faça login novamente.',
            );
         } else if (info?.message === 'jwt expired') {
            throw new UnauthorizedException(
               'A sessão expirou. Por favor, faça login novamente.',
            );
         } else {
            throw new UnauthorizedException('Usuário não autorizado.');
         }
      }
      return user;
   }
}
