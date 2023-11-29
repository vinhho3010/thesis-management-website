import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { socketIOConfig } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private socket: Socket) {
  }

  reconnect() {
    this.socket.disconnect();
    this.socket.connect();
  }
}
