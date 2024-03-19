import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoggedInRequest } from 'src/auth/dto/jwt-payload.dto';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() body: CreateExpenseBody,
    @Req() req: LoggedInRequest,
  ) {
    return await this.expenseService.create({
      ...body,
      chargerId: body.chargerId ?? req.user.sub,
    });
  }

  @Get(':groupId')
  async getBalances(@Param() params: { groupId: string }) {
    return this.expenseService.getBalances(params.groupId);
  }
}
