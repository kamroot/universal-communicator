// tutorial from https://gabrieltanner.org/blog/nestjs-realtime-chat

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class PubsubGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('socket-io');

  @SubscribeMessage('channel-info')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`Got message:: ${payload}`);
    // console.log(`Got message ${payload}`);
    // @ts-ignore
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
