import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async healthCheck(): Promise<string> {
    // todo: check db conn
    return 'ok';
  }
}
