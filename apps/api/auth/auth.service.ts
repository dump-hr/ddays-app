import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
  constructor(
    private companyService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async companyPasswordLogin(officialEmail: string, password: string) {
    if (!officialEmail) {
      throw new BadRequestException('officialEmail is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const company = await this.companyService.login(officialEmail, password);

    if (!company) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: company.id,
      officialEmail: officialEmail,
      name: company.name,
    });

    return accessToken;
  }
}
