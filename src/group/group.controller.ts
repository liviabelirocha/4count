import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { LoggedInRequest } from 'src/auth/dto/jwt-payload.dto';
import { AddUserToGroupBody } from './dto/add-user-to-group.dto';
import { CreateGroupBody } from './dto/create-group-body.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(
    @Body() body: CreateGroupBody,
    @Req() req: LoggedInRequest,
  ) {
    return await this.groupService.create({
      name: body.name,
      userId: req.user.sub,
    });
  }

  @Post('add/:groupId')
  async addUser(
    @Body() body: AddUserToGroupBody,
    @Param() params: { groupId: string },
  ) {
    return await this.groupService.addToGroup({
      groupId: params.groupId,
      name: body.name,
    });
  }

  @Get()
  async list(@Req() req: LoggedInRequest) {
    return await this.groupService.list(req.user.sub);
  }

  @Patch('bind/:groupUserId')
  async bindToGroup(
    @Param() params: { groupUserId: string },
    @Req() req: LoggedInRequest,
  ) {
    return await this.groupService.bindToGroup({
      groupUserId: params.groupUserId,
      userId: req.user.sub,
    });
  }

  @Get(':groupId')
  async listUnboundUsers(@Param() params: { groupId: string }) {
    return await this.groupService.listUnboundUsers(params.groupId);
  }
}
