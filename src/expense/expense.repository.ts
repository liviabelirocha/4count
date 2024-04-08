import { User } from 'src/auth/auth.entity';
import { Balance, Expense, Transaction } from './expense.entity';

export abstract class ExpenseRepository {
  abstract create(
    expense: ExpenseRepository.CreateParams,
    transactionClient?: unknown,
  ): Promise<void>;

  abstract getBalances(groupId: string): Promise<Balance[]>;

  abstract delete(
    expenseId: string,
    transactionClient?: unknown,
  ): Promise<void>;

  abstract getTransactionsByChargedId(params: {
    chargedId: string;
    groupId: string;
  }): Promise<ExpenseRepository.GetTransactionsByChargedIdResult>;
}

export declare namespace ExpenseRepository {
  type CreateParams = {
    id?: string;
    totalAmount: number;
    title: string;
    transactions: { chargedId: string; amount: number }[];
    chargerId: string;
    groupId: string;
  };

  type GetTransactionsByChargedIdResult = (Transaction & {
    expense: Expense;
    charger: User;
  })[];
}
