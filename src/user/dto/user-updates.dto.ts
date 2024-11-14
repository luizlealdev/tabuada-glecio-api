import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUser {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   class: string;

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
