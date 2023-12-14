import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CompaniesService } from 'src/companies/companies.service';

import { jwtSecret } from './auth.module';

type JwtPayload = {
  id: number;
  email: string;
  name: string;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private companiesService: CompaniesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const sponsor = await this.companiesService.getOne(payload.id);

    if (!sponsor) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
