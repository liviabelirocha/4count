import { Balance } from './dto/balance.dto';

export abstract class ExpenseRepository {
  abstract create(expense: ExpenseRepository.CreateParams): Promise<void>;

  abstract getBalances(groupId: string): Promise<Balance[]>;
}

export declare namespace ExpenseRepository {
  type CreateParams = {
    totalAmount: number;
    title: string;
    amountForEachUser: number;
    chargedIds: string[];
    chargerId: string;
    groupId: string;
  };
}
