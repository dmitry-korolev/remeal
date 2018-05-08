import { fromEvent } from 'rxjs/observable'
import io from 'socket.io-client'
import {
  CONNECT_EVENT,
  INIT_EVENT,
  PRESENTATION_DISCONNECTED_EVENT,
  REMOTE,
  REQUEST_RECONNECT_EVENT,
  SETSTATE_EVENT
} from '../../../constants'

const socket = io(document.location.origin, {
  query: { type: REMOTE }
})

socket.on(CONNECT_EVENT, () => socket.emit(REQUEST_RECONNECT_EVENT))

export const init$ = fromEvent(socket, INIT_EVENT)
export const presentationDisconnect$ = fromEvent(
  socket,
  PRESENTATION_DISCONNECTED_EVENT
)
export const setState$ = fromEvent(socket, SETSTATE_EVENT)

export const sendCommand = (command) => socket.emit(command)
