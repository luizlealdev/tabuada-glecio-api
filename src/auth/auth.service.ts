import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegisterUser, LoginUser } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

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

         const user = await this.userService.createUser(createUser);
         console.log(user.id);

         return {
            token: this.jwtService.sign({ sub: user.id, email: user.email }),
         };
      } catch (err) {
         throw new Error('Erro ao criar o usuário ou gerar o token: ' + err);
      }
   }

   async login(data: LoginUser): Promise<any> {
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
      console.log(passwordMatches);

      if (!passwordMatches)
         throw new UnauthorizedException('Incorrect Password');

      return {
         token: this.jwtService.sign({ email: (await user).name }),
      };
   }
}
