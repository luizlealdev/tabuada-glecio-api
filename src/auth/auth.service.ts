import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegisterUser, LoginUser } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { identity } from 'rxjs';

@Injectable()
export class AuthService {
   constructor(
      private readonly prisma: PrismaService,
      private jwtService: JwtService,
      private readonly userService: UserService,
   ) {}

   async register(data: RegisterUser): Promise<any> {
      try {
         const createUser = new RegisterUser();
         createUser.name = data.name;
         createUser.email = data.email;
         createUser.class = data.class;
         createUser.password = await bcrypt.hash(data.password, 10);
         createUser.avatar_id = data.avatar_id;

         const user = await this.userService.createUser(createUser);

         return {
            user: {
               id: user.id,
               name: user.name,
               class: user.class,
               avatar_id: user.avatar_id,
            },
            token: this.jwtService.sign({ sub: user.id, email: user.email }),
         };
      } catch (err) {
         throw new Error('Erro ao criar o usuário ou gerar o token: ' + err);
      }
   }

   async login(data: LoginUser): Promise<any> {
      try {
         const user = await this.prisma.user.findUnique({
            where: {
               email: data.email,
            },
         });

         if (!user) throw new UnauthorizedException('User Not Found');

         const passwordMatches = await bcrypt.compare(
            data.password,
            user.password,
         );

         if (!passwordMatches)
            throw new UnauthorizedException('Incorrect Password');

         return {
            user: {
               id: user.id,
               name: user.name,
               class: user.class,
               avatar_id: user.avatar_id,
               is_admin: user.is_admin,
            },
            token: this.jwtService.sign({ email: (await user).name }),
         };
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
