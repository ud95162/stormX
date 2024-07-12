import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Stomp} from '@stomp/stompjs';

@Injectable()
export class SocketServiceService {
  WEB_SOCKET: any;
  POST_SUBSCRIBE_PATH = '/user/topic/post';

  constructor() {
    // TODO: Uncomment
    // this.wsConnect();
  }

  wsConnect() {
    // const socket = new WebSocket(environment.SOCKET_BASE_URL + '/greeting/websocket');
    const socket = new WebSocket(environment.SOCKET_BASE_URL + '/websocket');
    this.WEB_SOCKET = Stomp.over(socket);
  }

}
