import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [AuthModule, ExpenseModule],
  controllers: [AppController, ExpenseController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
