import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
  constructor(
    private companyService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async CompanyPasswordLogin(email: string, password: string) {
    if (!email) {
      throw new BadRequestException('email is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const company = await this.companyService.login(email, password);

    if (!company) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: company.id,
      email: email,
      name: company.name,
    });

    return accessToken;
  }
}
