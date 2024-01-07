import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwksUrl as jwksAADUrl } from './auth.consts';

export type AzureADJwtPayload = {
  sub: string;
  name: string;
  email: string;
  roles: string;
};

@Injectable()
export class AzureADStrategy extends PassportStrategy(Strategy, 'AzureAD') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        rateLimit: true,
        jwksUri: jwksAADUrl,
      }),
    });
  }

  async validate(payload: AzureADJwtPayload) {
    return {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
