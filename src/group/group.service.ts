import { HttpException, Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(data: { name: string; userId: string }) {
    return await this.groupRepository.create(data);
  }

  async addUser(data: { groupId: string; userId: string }) {
    const userAlreadyInGroup = await this.groupRepository.isUserInGroup(data);

    if (userAlreadyInGroup)
      throw new HttpException('User already in group', 400);

    return await this.groupRepository.addUser(data);
  }

  async isUserInGroup({
    groupId,
    userId,
  }: {
    groupId: string;
    userId: string;
  }) {
    return await this.groupRepository.isUserInGroup({
      groupId,
      userId,
    });
  }
}
