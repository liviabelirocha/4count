import { User } from 'src/auth/auth.entity';

export type Expense = {
  id: string;
  amount: number;
  title: string;
};

export type Transaction = {
  id: string;
  expenseId: string;
  chargerId: string;
  chargedId: string;
  amount: number;
  groupId: string;
};

export type Balance = {
  user: Omit<User, 'password'>;
  balance: number;
};
