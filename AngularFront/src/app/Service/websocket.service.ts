import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { port } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class Websocket {

  socket: Socket;

  constructor() {
    this.socket = io(`${port}/GESTIONCOMMANDE-SERVICE/Commande/`);
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber: any) => {
      this.socket.on(eventname, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
}
