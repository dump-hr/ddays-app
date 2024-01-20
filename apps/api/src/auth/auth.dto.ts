import { JwtPayload } from '@ddays-app/types';

export class AuthenticatedRequest extends Request {
  user: JwtPayload;
}
