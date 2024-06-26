import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Balance } from '../expense.entity';
import { ExpenseRepository } from '../expense.repository';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    {
      transactions,
      title,
      totalAmount,
      chargerId,
      groupId,
      id,
    }: ExpenseRepository.CreateParams,
    transactionClient?: PrismaService,
  ): Promise<void> {
    const client = transactionClient ?? this.prisma;

    await client.expense.create({
      data: {
        id,
        amount: totalAmount,
        title,
        transactions: {
          create: transactions.map((t) => ({
            amount: t.amount,
            chargedId: t.chargedId,
            chargerId,
            groupId,
          })),
        },
      },
    });
  }

  async getBalances(groupId: string): Promise<Balance[]> {
    const groupUsers = await this.prisma.groupUser.findMany({
      where: { groupId },
      include: {
        user: {
          include: {
            charged: true,
            charger: true,
          },
        },
      },
    });

    const balances = groupUsers.map((gu) => {
      const positive = gu.user.charger.reduce(
        (acc, curr) => acc + curr.amount,
        0,
      );

      const negative = gu.user.charged.reduce(
        (acc, curr) => acc + curr.amount,
        0,
      );

      return {
        user: {
          ...pick(gu.user, ['id', 'name', 'email']),
        },
        balance: positive - negative,
      };
    });

    return balances;
  }

  async delete(
    expenseId: string,
    transactionClient?: PrismaService,
  ): Promise<void> {
    const client = transactionClient ?? this.prisma;

    await client.expense.delete({ where: { id: expenseId } });
  }

  async getExpensesByGroup(
    groupId: string,
  ): Promise<ExpenseRepository.GetExpensesByGroupResult> {
    return await this.prisma.expense.findMany({
      where: {
        transactions: {
          every: { groupId },
        },
      },
      include: { transactions: { include: { charger: true } } },
    });
  }
}
