import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class AuthService {
  constructor(
    private companyService: CompanyService,
    private jwtService: JwtService,
  ) {}

  async companyPasswordLogin(username: string, password: string) {
    if (!username) {
      throw new BadRequestException('Name is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const company = await this.companyService.login(username, password);

    if (!company) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: company.id,
      username: company.username,
      name: company.name,
    });

    return accessToken;
  }
}
