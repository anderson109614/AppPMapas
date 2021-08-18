import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  readonly url:string="http://157.245.248.79:3000/";
  constructor() {
    this.socket=io.io(this.url);
   }
  socket:any;
  
  listen(eventName:string){
    return new Observable((Subscriber)=>{
      this.socket.on(eventName,(data)=>{
        Subscriber.next(data);
      })
    });
  }

  emit(eventName:string,data:any){
    this.socket.emit(eventName,data);
  }
}
