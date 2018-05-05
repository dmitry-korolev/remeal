import express from 'express'
import socket from 'socket.io'
import { argv } from 'yargs'
import { Server } from 'http'

import {
  CONNECTION_EVENT,
  DISCONNECT_EVENT,
  PRESENTATION,
  PRESENTATION_DISCONNECTED_EVENT,
  PRESENTATION_EVENTS,
  REMOTE,
  REMOTE_EVENTS
} from '../constants'

const app = Server(
  express()
    .use(express.static('public'))
    .use('/plugin', express.static('plugin'))
)
const io = socket(app)
const log = (...args) => {
  if (!argv.log) {
    return
  }

  console.log(...args)
}

const index = app.listen(argv.port || 80, () => {
  log(`Server is running at ${index.address().port}`)
})

let hasRemote = false

io.on(CONNECTION_EVENT, (socket) => {
  if (socket.handshake.query.type === PRESENTATION) {
    log('Presentation connected')
    PRESENTATION_EVENTS.forEach((event) =>
      socket.on(event, (data) => {
        log('Event from presentation:', event, data)
        socket.broadcast.emit(event, data)
      })
    )

    socket.on(DISCONNECT_EVENT, () => {
      log('Presentation disconnected')
      socket.broadcast.emit(PRESENTATION_DISCONNECTED_EVENT)
    })
  }

  if (socket.handshake.query.type === REMOTE && !hasRemote) {
    log('Remote connected')

    // Ignore other remote controls
    hasRemote = true

    REMOTE_EVENTS.forEach((event) =>
      socket.on(event, (data) => {
        log('Event from remote:', event, data)
        socket.broadcast.emit(event, data)
      })
    )

    socket.on(DISCONNECT_EVENT, () => {
      hasRemote = false
      log('Remote disconnected')
    })
  }
})
