import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { LoggedInRequest } from 'src/auth/dto/jwt-payload.dto';
import { CreateExpenseBody } from './dto/create-expense-body.dto';
import { UpdateExpenseBody } from './dto/update-expense-body.dto';
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

  @Get('balances')
  @CacheKey('balances')
  @CacheTTL(0)
  async getBalances(@Param() params: { groupId: string }) {
    return this.expenseService.getBalances(params.groupId);
  }

  @Get('transactions')
  @CacheKey('transactions')
  @CacheTTL(0)
  async getTransactions(@Param() params: { groupId: string }) {
    return this.expenseService.getTransactions(params.groupId);
  }

  @Get()
  async getByUser(
    @Param() params: { groupId: string },
    @Req() req: LoggedInRequest,
  ) {
    return this.expenseService.getUserExpenses({
      groupId: params.groupId,
      userId: req.user.sub,
    });
  }

  @Put(':expenseId')
  async update(
    @Param() params: { expenseId: string; groupId },
    @Body() body: UpdateExpenseBody,
    @Req() req: LoggedInRequest,
  ) {
    return this.expenseService.update({
      ...body,
      groupId: params.groupId,
      id: params.expenseId,
      chargerId: body.chargerId ?? req.user.sub,
    });
  }
}
