import { BadRequestException, Injectable } from '@nestjs/common';
import { Atomizer } from 'src/utils/atomizer';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { UpdateExpenseBody } from './dto/update-expense-body.dto';
import { ExpenseRepository } from './expense.repository';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly atomizer: Atomizer,
  ) {}

  async create({
    amount,
    transactions,
    title,
    chargerId,
    groupId,
  }: CreateExpenseBody & { chargerId: string; groupId: string }) {
    const amountInCents = amount * 100;

    const transactionsSum = transactions.reduce(
      (acc, curr) => acc + curr.amount * 100,
      0,
    );

    // making sure the error is max 2 cents
    if (
      Math.abs(transactionsSum - amountInCents) < -2 ||
      Math.abs(transactionsSum - amountInCents) > 2
    )
      throw new BadRequestException('Error way too big');

    const expense = await this.expenseRepository.create({
      transactions: transactions.map((t) => ({
        amount: Math.trunc(t.amount * 100),
        chargedId: t.chargedId,
      })),
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

  async update({
    amount,
    transactions,
    chargerId,
    id,
    title,
    groupId,
  }: UpdateExpenseBody & {
    id: string;
    groupId: string;
  }) {
    const amountInCents = amount * 100;

    const transactionsSum = transactions.reduce(
      (acc, curr) => acc + curr.amount * 100,
      0,
    );

    // making sure the error is max 2 cents
    if (
      Math.abs(transactionsSum - amountInCents) < -2 ||
      Math.abs(transactionsSum - amountInCents) > 2
    )
      throw new BadRequestException('Error way too big');

    await this.atomizer.runAtomically([
      async ({ transactionClient }) => {
        await this.expenseRepository.delete(id, transactionClient);

        await this.expenseRepository.create(
          {
            transactions: transactions.map((t) => ({
              amount: Math.trunc(t.amount * 100),
              chargedId: t.chargedId,
            })),
            chargerId,
            groupId,
            title,
            totalAmount: amountInCents,
            id,
          },
          transactionClient,
        );
      },
    ])();
  }

  async getUserExpenses({
    userId,
    groupId,
  }: {
    userId: string;
    groupId: string;
  }) {
    const transactions =
      await this.expenseRepository.getTransactionsByChargedId({
        chargedId: userId,
        groupId,
      });

    return transactions.map((t) => ({
      expenseId: t.expense.id,
      title: t.expense.title,
      totalAmount: t.expense.amount,
      userAmount: t.amount,
      paidBy: t.charger.name,
    }));
  }
}
