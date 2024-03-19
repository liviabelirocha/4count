import { User } from 'src/auth/auth.entity';

export type Balance = {
  user: Omit<User, 'password'>;
  balance: number;
};
