import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { ExpenseRepository } from './expense.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async create(body: CreateExpenseBody) {
    const user = await this.expenseRepository.create(body);

    return user;
  }
}
