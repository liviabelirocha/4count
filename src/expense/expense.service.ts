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
  }: CreateExpenseBody & { chargerId: string; groupId: string }) {
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

  private getTransactionsRecursevely(
    balances: Map<string, { balance: number; name: string }>,
    transactions: {
      amount: number;
      toId: string;
      toName: string;
      fromId: string;
      fromName: string;
    }[],
  ) {
    const maxDebitor = Array.from(balances.entries()).reduce((prev, curr) =>
      prev[1].balance < curr[1].balance ? prev : curr,
    );

    const maxCreditor = Array.from(balances.entries()).reduce((prev, curr) =>
      prev[1].balance > curr[1].balance ? prev : curr,
    );

    if (maxDebitor[1].balance === 0 && maxCreditor[1].balance === 0) return;

    const minimum = Math.min(
      Math.abs(maxDebitor[1].balance),
      Math.abs(maxCreditor[1].balance),
    );

    balances.set(maxDebitor[0], {
      name: maxDebitor[1].name,
      balance: maxDebitor[1].balance + minimum,
    });
    balances.set(maxCreditor[0], {
      name: maxCreditor[1].name,
      balance: maxCreditor[1].balance - minimum,
    });

    transactions.push({
      amount: minimum,
      fromId: maxDebitor[0],
      fromName: maxDebitor[1].name,
      toId: maxCreditor[0],
      toName: maxCreditor[1].name,
    });

    this.getTransactionsRecursevely(balances, transactions);
  }

  async getTransactions(groupId: string) {
    const balances = await this.expenseRepository.getBalances(groupId);

    const balanceMap = new Map(
      balances.map((b) => [
        b.user.id,
        { balance: b.balance, name: b.user.name },
      ]),
    );

    const transactions = [];

    this.getTransactionsRecursevely(balanceMap, transactions);

    return transactions;
  }
}
