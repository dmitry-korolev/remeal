import io from 'socket.io-client'
import { REMOTE } from '../../constants'

export const socket = io(document.location.origin, {
  query: { type: REMOTE }
})

export const sendCommand = (command, data) => socket.emit(command, data)
