import { Body, Controller, Post } from '@nestjs/common';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(@Body() body: CreateExpenseBody) {
    return 'nois da o cu porraaa';

    // return await this.expenseService.create(body);
  }
}
