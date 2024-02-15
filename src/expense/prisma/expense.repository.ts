import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../expense.repository';
import { CreateExpenseBody } from '../dto/create-expense-body.dto';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(expense: CreateExpenseBody): Promise<void> {
    await this.prisma.expense.create({ data: expense });
  }
}
