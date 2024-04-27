import { ModifyBoothDto } from '@ddays-app/types';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { BoothService } from './booth.service';

@WebSocketGateway()
export class BoothGateway {
  constructor(private readonly boothService: BoothService) {}
}
