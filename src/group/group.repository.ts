export abstract class GroupRepository {
  abstract create(expense: GroupRepository.CreateParams): Promise<void>;

  abstract addUser(params: GroupRepository.AddUserParams): Promise<void>;
}

export declare namespace GroupRepository {
  type CreateParams = {
    name: string;
    userId: string;
  };

  type AddUserParams = {
    groupId: string;
    userId: string;
  };
}
