import { Module } from '@nestjs/common';
import { Atomizer } from 'src/shared/utils/atomizer';
import { PrismaAtomizer } from './prisma.atomizer';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, { provide: Atomizer, useClass: PrismaAtomizer }],
  exports: [PrismaService, Atomizer],
})
export class PrismaModule {}
