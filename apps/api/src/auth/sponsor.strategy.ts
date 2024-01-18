import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CompaniesService } from 'src/companies/companies.service';

import { JwtPayload } from './auth.dto';
import { jwtSecret } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'sponsor') {
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

    return {
      id: sponsor.id,
      name: sponsor.name,
      username: sponsor.username,
      role: 'sponsor',
    };
  }
}
