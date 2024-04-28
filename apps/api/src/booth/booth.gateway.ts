import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class BoothGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  afterInit() {}

  handleConnection(client: Socket) {
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client);
  }

  emitReserve(id: number) {
    this.server.emit('booth:reserve', { id });
  }

  emitClear(id: number) {
    this.server.emit('booth:clear', { id });
  }
}
