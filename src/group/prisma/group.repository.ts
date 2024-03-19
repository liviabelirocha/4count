import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GroupRepository } from '../group.repository';

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(group: GroupRepository.CreateParams): Promise<void> {
    await this.prisma.group.create({
      data: {
        name: group.name,
        users: {
          create: [
            {
              userId: group.userId,
            },
          ],
        },
      },
    });
  }

  async addUser(params: GroupRepository.AddUserParams): Promise<void> {
    await this.prisma.groupUser.create({
      data: params,
    });
  }
}
