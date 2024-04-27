// src/gateway/websockets.gateway.ts

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3005, { transports: ['polling'], cors: true })
export class BoothGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Set<Socket> = new Set();

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  @SubscribeMessage('booth:update-available')
  handleUpdateAvailable(data: any) {
    this.server.emit('booth:update-available', data);
  }
}
