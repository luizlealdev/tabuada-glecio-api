import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUser {
   id?: number;
   
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsString()
   @IsNotEmpty()
   class: string;

   @IsString()
   @IsNotEmpty()
   password: string;
}

export class LoginUser {
   @IsString()
   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsString()
   @IsNotEmpty()
   password: string;
}
