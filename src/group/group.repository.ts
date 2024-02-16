export abstract class GroupRepository {
  abstract create(expense: GroupRepository.CreateParams): Promise<void>;
}

export declare namespace GroupRepository {
  type CreateParams = {
    name: string;
    userId: string;
  };
}
