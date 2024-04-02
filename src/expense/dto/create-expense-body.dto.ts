import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class CreateExpenseBody {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty({
    each: true,
  })
  chargedIds: string[];

  @Optional()
  chargerId: string;
}
