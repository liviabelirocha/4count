import { CreateUserBody } from './dto/create-user-body.dto';
import { User } from './user.entity';

export abstract class UserRepository {
  abstract create(user: CreateUserBody): Promise<void>;

  abstract findOneByEmail(email: string): Promise<User | undefined>;
}
