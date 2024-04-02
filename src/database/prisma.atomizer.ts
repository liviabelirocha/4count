import { Injectable } from '@nestjs/common';
import { Atomizer } from 'src/utils/atomizer';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaAtomizer implements Atomizer {
  constructor(private readonly prisma: PrismaService) {}

  public runAtomically<
    F extends (arg: { transactionClient: unknown }) => ReturnType<F>,
    T extends readonly F[] | [],
  >(transactionablePrismaPromises: T) {
    return async (): Promise<{
      -readonly [P in keyof T]: Awaited<ReturnType<T[P]>>;
    }> => {
      const results = await this.prisma.$transaction<Awaited<ReturnType<F>>[]>(
        async (transactionClient) =>
          Promise.all(
            transactionablePrismaPromises.map((fun) =>
              fun({ transactionClient }),
            ),
          ),
      );

      return results as { -readonly [P in keyof T]: Awaited<ReturnType<T[P]>> };
    };
  }
}
