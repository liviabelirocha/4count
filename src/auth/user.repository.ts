import { User } from './auth.entity';
import { SignUpBody } from './dto/sign-up.dto';

export abstract class UserRepository {
  abstract create(user: SignUpBody): Promise<void>;

  abstract findOneByEmail(email: string): Promise<User | undefined>;

  abstract findOneById(id: string): Promise<User | undefined>;
}
