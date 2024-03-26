import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoggedInRequest } from 'src/auth/dto/jwt-payload.dto';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { ExpenseService } from './expense.service';

@Controller('expense/:groupId')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Body() body: CreateExpenseBody,
    @Req() req: LoggedInRequest,
    @Param() params: { groupId: string },
  ) {
    return await this.expenseService.create({
      ...body,
      groupId: params.groupId,
      chargerId: body.chargerId ?? req.user.sub,
    });
  }

  @Get()
  async getBalances(@Param() params: { groupId: string }) {
    return this.expenseService.getBalances(params.groupId);
  }

  @Get('transactions')
  async getTransactions(@Param() params: { groupId: string }) {
    return this.expenseService.getTransactions(params.groupId);
  }
}
