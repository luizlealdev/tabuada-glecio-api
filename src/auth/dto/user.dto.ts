import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

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

   @IsNotEmpty()
   @IsNumber()
   @Length(1, 50)
   avatar_id: number;
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
