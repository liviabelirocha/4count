import { Injectable } from '@nestjs/common';
import { CreateGroupBody } from './dto/create-group-body.dto';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(body: CreateGroupBody) {
    // const user = await this.groupRepository.create(body);
    // return user;
  }
}
