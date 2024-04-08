import { User } from 'src/auth/auth.entity';
import { Group, GroupUser } from './group.entity';

export abstract class GroupRepository {
  abstract create(expense: GroupRepository.CreateParams): Promise<void>;

  abstract addUser(params: GroupRepository.AddUserParams): Promise<void>;

  abstract findUserInGroup(
    params: GroupRepository.FindByIdAndUser,
  ): Promise<{ group: Group; user: User }>;

  abstract list(userId: string): Promise<Group[]>;

  abstract update(params: { id: string; userId: string }): Promise<void>;

  abstract listUnbountUsers(groupId: string): Promise<GroupUser[]>;
}

export declare namespace GroupRepository {
  type CreateParams = {
    name: string;
    userId: string;
  };

  type AddUserParams = {
    groupId: string;
    name: string;
  };

  type FindByIdAndUser = {
    groupId: string;
    userId: string;
  };
}
