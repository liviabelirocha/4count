import { Group } from './group.entity';

export abstract class GroupRepository {
  abstract create(expense: GroupRepository.CreateParams): Promise<void>;

  abstract addUser(params: GroupRepository.AddUserParams): Promise<void>;

  abstract isUserInGroup(
    params: GroupRepository.FindByIdAndUser,
  ): Promise<boolean>;

  abstract list(userId: string): Promise<Group[]>;
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

  type FindByIdAndUser = AddUserParams;
}
