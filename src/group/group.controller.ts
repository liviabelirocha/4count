import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateGroupBody } from './dto/create-group-body.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createGroup(@Body() body: CreateGroupBody) {
    return 'nois da o cu porraaa';

    // return await this.groupService.create(body);
  }
}
