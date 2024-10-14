import { IsNotEmpty, IsNumber } from "class-validator";

export class RankingEntry {
   @IsNumber()
   @IsNotEmpty()
   score: number
}