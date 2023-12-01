import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private socket: Socket) {
  }

  reconnect() {
    this.socket.disconnect();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user._id ?? '';
    this.socket.ioSocket.io.opts.query = {
      userId: userId
    };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}
