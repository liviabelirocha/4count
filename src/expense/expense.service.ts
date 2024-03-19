import { Injectable } from '@nestjs/common';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { ExpenseRepository } from './expense.repository';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async create({
    amount,
    charged,
    title,
    chargerId,
    groupId,
  }: CreateExpenseBody & { chargerId: string }) {
    const amountInCents = amount * 100;

    const amountForEachUser = amountInCents / charged.length;

    const expense = await this.expenseRepository.create({
      amountForEachUser,
      chargedIds: charged,
      chargerId,
      groupId,
      title,
      totalAmount: amountInCents,
    });

    return expense;
  }

  async getBalances(groupId: string) {
    return this.expenseRepository.getBalances(groupId);
  }
}
