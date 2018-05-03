const app = require('http').createServer((req, res) => {
  fs.readFile(
    __dirname + '/index.html',
    (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    }
  )
})

const io = require('socket.io')(app)
const fs = require('fs')
const argv = require('yargs').argv

app.listen(argv.port || 80)

io.on('connection', (socket) => {
  socket.on('prev', () => {
    io.emit('prev')
  })

  socket.on('next', () => {
    io.emit('next')
  })

  socket.on('requestreconnect', () => {
    io.emit('requestreconnect')
  })

  socket.on('connected', data => {
    io.emit('connected', data)
  })

  socket.on('slidechanged', data => {
    io.emit('slidechanged', data)
  })
})

