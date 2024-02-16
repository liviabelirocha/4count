import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateExpenseBody } from '../dto/create-expense-body.dto';
import { ExpenseRepository } from '../expense.repository';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(expense: CreateExpenseBody): Promise<void> {
    // await this.prisma.expense.create({ data: {} });
  }
}
