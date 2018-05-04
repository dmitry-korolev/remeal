import express from 'express'
import socket from 'socket.io'
import { argv } from 'yargs'
import { Server } from 'http'

import { CONNECTION_EVENT, PRESENTATION_EVENTS, REMOTE_EVENTS } from '../constants'

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
  log(`Server is running at ${index.address().port}`, )
})

io.on(CONNECTION_EVENT, (socket) => {
  REMOTE_EVENTS.forEach(event => socket.on(event, data => {
    log('Event from remote:', event, data)
    io.emit(event, data)
  }))

  PRESENTATION_EVENTS.forEach(event => socket.on(event, data => {
    log('Event from presentation:', event, data)
    io.emit(event, data)
  }))
})
