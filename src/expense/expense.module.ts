import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ExpenseController } from './expense.controller';
import { ExpenseRepository } from './expense.repository';
import { ExpenseService } from './expense.service';
import { PrismaExpenseRepository } from './prisma/expense.repository';

@Module({
  providers: [
    ExpenseService,
    {
      provide: ExpenseRepository,
      useClass: PrismaExpenseRepository,
    },
  ],
  controllers: [ExpenseController],
  exports: [ExpenseService],
  imports: [PrismaModule],
})
export class ExpenseModule {}
