import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import { GroupService } from './group.service';

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(private groupService: GroupService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user,
      params: { groupId },
    } = context.switchToHttp().getRequest() as {
      user: JwtPayload;
      params: { groupId?: string };
    };

    if (!groupId) return true;

    const isUserInGroup = await this.groupService.isUserInGroup({
      groupId,
      userId: user.sub,
    });

    return isUserInGroup;
  }
}
