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
  // From remote
  socket.on('remote', ({ command }) => {
    io.emit(command)
  })

  // From presentation
  socket.on('init', data => {
    io.emit('init', data)
  })

  socket.on('setstate', data => {
    io.emit('setstate', data)
  })
})

