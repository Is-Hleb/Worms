import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import {Logger} from "@nestjs/common";
import {AppService} from "./app.service";


@WebSocketGateway(3001, {'transports': ['websocket']})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService) {

  }

  private logger: Logger = new Logger('AppGateway');

  // @SubscribeMessage(EventNames.ChangeDirection)
  // handleChangeDirection(client: Socket, payload: ChangeDirectionRequest): void {
  //   let response;
  //   try {
  //     response = this.appService.changeDirection(payload);
  //   } catch (e) {
  //     console.log('CHANGE DIRECTION ERROR' + e);
  //     return;
  //   }
  //   this.server.to(response.roomId).emit(EventNames.ChangeDirection, response);
  // }

  afterInit(server: Server) {
    this.logger.log('Init');
    this.appService.initiate(this.server)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
