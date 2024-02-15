import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseRepository } from './expense.repository';
import { PrismaExpenseRepository } from './prisma/expense.repository';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

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
