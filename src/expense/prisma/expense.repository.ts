import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { PrismaService } from 'src/database/prisma.service';
import { Balance } from '../dto/balance.dto';
import { ExpenseRepository } from '../expense.repository';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    amountForEachUser,
    title,
    totalAmount,
    chargedIds,
    chargerId,
    groupId,
  }: ExpenseRepository.CreateParams): Promise<void> {
    await this.prisma.expense.create({
      data: {
        amount: totalAmount,
        title,
        transactions: {
          create: chargedIds.map((id) => ({
            amount: amountForEachUser,
            chargedId: id,
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
}
