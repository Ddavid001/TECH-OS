import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  server!: Server;

  notify(to: string, event: string, payload: any) {
    this.server.to(to).emit(event, payload);
  }
}


