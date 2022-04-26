import { Injectable } from '@nestjs/common';
import {Server} from "socket.io";

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to worms-api!' };
  }

  initiate(server: Server) {
    return {}
  }
}
