import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transaction } from './transaction.dto';

export class CreateExpenseBody {
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty({
    each: true,
  })
  @ApiProperty({
    type: [Transaction],
  })
  transactions: Transaction[];

  @Optional()
  @ApiProperty()
  chargerId: string;
}
