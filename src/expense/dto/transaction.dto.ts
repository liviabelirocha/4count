import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty()
  chargedId: string;

  @ApiProperty()
  amount: number;
}
