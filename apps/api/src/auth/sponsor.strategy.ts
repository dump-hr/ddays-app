import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CompanyService } from 'src/company/company.service';

import { JwtPayload } from './auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'sponsor') {
  constructor(private companyService: CompanyService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const sponsor = await this.companyService.getOne(payload.id);

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
