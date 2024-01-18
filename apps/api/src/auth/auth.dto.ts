export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export type JwtPayload = {
  id: number;
  name: string;
  username: string;
};
