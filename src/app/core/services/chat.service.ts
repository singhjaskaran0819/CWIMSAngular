import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Message } from '../message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  // sendMessage(msg: string) {
  //   this.socket.emit("message", msg);
  // }
  // getMessages() {
  //   return this.socket
  //     .fromEvent("message")
  //     .pipe(map((data) => data.msg));
  // }
}
