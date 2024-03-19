import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(data: { name: string; userId: string }) {
    return await this.groupRepository.create(data);
  }

  async addUser(data: { groupId: string; userId: string }) {
    return await this.groupRepository.addUser(data);
  }
}
