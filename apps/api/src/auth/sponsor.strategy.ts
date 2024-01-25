import { JwtPayload } from '@ddays-app/types';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'sponsor') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload): JwtPayload {
    return {
      id: payload.id,
      name: payload.name,
      username: payload.username,
      role: 'sponsor',
    };
  }
}
