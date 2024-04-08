import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/modules/auth.module';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseModule } from './expense/expense.module';
import { GroupController } from './group/group.controller';
import { GroupGuard } from './group/group.guard';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    AuthModule,
    ExpenseModule,
    GroupModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
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
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
