import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/modules/auth.module';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseModule } from './expense/expense.module';
import { GroupController } from './group/group.controller';
import { GroupGuard } from './group/group.guard';
import { GroupModule } from './group/group.module';

@Module({
  imports: [AuthModule, ExpenseModule, GroupModule],
  controllers: [AppController, ExpenseController, GroupController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GroupGuard,
    },
  ],
})
export class AppModule {}
