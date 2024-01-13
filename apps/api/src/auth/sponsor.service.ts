import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
  constructor(
    private companyService: CompaniesService,
    private jwtService: JwtService,
  ) {}

  async companyPasswordLogin(name: string, password: string) {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const company = await this.companyService.login(name, password);

    if (!company) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: company.id,
      name: company.name,
    });

    return accessToken;
  }
}
