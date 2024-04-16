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

  abstract getExpensesByGroup(
    groupId: string,
  ): Promise<ExpenseRepository.GetExpensesByGroupResult>;
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

  type GetTransactionsByUserIdResult = (Transaction & {
    expense: Expense;
    charger: User;
  })[];

  type GetExpensesByGroupResult = (Expense & {
    transactions: (Transaction & {
      charger: User;
    })[];
  })[];
}
