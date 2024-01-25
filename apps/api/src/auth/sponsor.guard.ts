import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SponsorGuard extends AuthGuard('sponsor') {}
