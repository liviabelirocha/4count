import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ExpenseController } from './expense.controller';
import { ExpenseRepository } from './expense.repository';
import { ExpenseService } from './expense.service';
import { PrismaExpenseRepository } from './prisma/expense.repository';

@Module({
  providers: [
    PrismaService,
    ExpenseService,
    {
      provide: ExpenseRepository,
      useClass: PrismaExpenseRepository,
    },
  ],
  controllers: [ExpenseController],
  exports: [ExpenseService],
})
export class ExpenseModule {}
