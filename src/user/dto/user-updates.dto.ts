import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUser {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsNumber()
   @IsNotEmpty()
   course_id: number;

   @IsNumber()
   @IsNotEmpty()
   avatar_id: number;
}

export class UpdatePaswordUser {
   @IsString()
   @IsNotEmpty()
   old_password: string;

   @IsString()
   @IsNotEmpty()
   new_password: string;
}
