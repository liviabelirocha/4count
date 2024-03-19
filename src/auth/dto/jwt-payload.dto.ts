import { Request } from 'express';

export class JwtPayload {
  sub: string;
  name: string;
  email: string;
}

export type LoggedInRequest = Request & {
  user: JwtPayload;
};
