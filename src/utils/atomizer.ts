export abstract class Atomizer {
  abstract runAtomically<
    F extends (arg: { transactionClient: unknown }) => ReturnType<F>,
    T extends readonly F[] | [],
  >(
    workFunctions: T,
  ): () => Promise<{ -readonly [P in keyof T]: Awaited<ReturnType<T[P]>> }>;
}
