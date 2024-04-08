import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/auth/user.repository';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: { name: string; userId: string }) {
    return await this.groupRepository.create(data);
  }

  async addToGroup(data: { groupId: string; name: string }) {
    return await this.groupRepository.addUser(data);
  }

  async isUserInGroup({
    groupId,
    userId,
  }: {
    groupId: string;
    userId: string;
  }) {
    const userGroup = await this.groupRepository.findUserInGroup({
      groupId,
      userId,
    });

    return !!userGroup;
  }

  async list(userId: string) {
    return await this.groupRepository.list(userId);
  }

  async bindToGroup({
    groupUserId,
    userId,
  }: {
    groupUserId: string;
    userId: string;
  }) {
    const user = await this.userRepository.findOneById(userId);

    if (!user) throw new NotFoundException('User not found');

    await this.groupRepository.update({
      id: groupUserId,
      userId,
    });
  }

  async listUnboundUsers(groupId: string) {
    return await this.groupRepository.listUnbountUsers(groupId);
  }
}
