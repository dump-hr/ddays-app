import { JwtPayload } from './sponsor/jwt.strategy';

export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}
