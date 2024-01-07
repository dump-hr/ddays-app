import { JwtPayload } from './sponsor.strategy';

export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}
