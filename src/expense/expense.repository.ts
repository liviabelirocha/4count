import { CreateExpenseBody } from './dto/create-expense-body.dto';

export abstract class ExpenseRepository {
  abstract create(expense: CreateExpenseBody): Promise<void>;
}
