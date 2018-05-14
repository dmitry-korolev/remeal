import { fromEvent } from 'rxjs/observable'
import {
  CONNECT_EVENT,
  INIT_EVENT,
  PRESENTATION_DISCONNECTED_EVENT,
  REQUEST_RECONNECT_EVENT,
  SETSTATE_EVENT
} from '../../../constants'

import { socket } from '../../services/socket'

socket.on(CONNECT_EVENT, () => socket.emit(REQUEST_RECONNECT_EVENT))

export const init$ = fromEvent(socket, INIT_EVENT)
export const presentationDisconnect$ = fromEvent(
  socket,
  PRESENTATION_DISCONNECTED_EVENT
)
export const setState$ = fromEvent(socket, SETSTATE_EVENT)
