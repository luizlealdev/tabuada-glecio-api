import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUser {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   class: string;
}

export class UpdatePaswordUser {
   @IsString()
   @IsNotEmpty()
   old_password: string

   @IsString()
   @IsNotEmpty()
   new_password: string
}