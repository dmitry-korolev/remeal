const Remeal = {}

Remeal.init = () => {
  // ignore notes
  if( window.location.search.match( /(\?|\&)notes/gi ) !== null ) {
    return
  }

  const url = prompt('Enter socket.io server url')

  if (!url) {
    return
  }

  const socket = io(url)

  const connect = () => {
    socket.emit('connected', {
      title: document.title,
      url: document.location.href,
      notes: Reveal.getSlideNotes()
    })
  }

  socket.on('connect', () => connect())
  socket.on('requestreconnect', () => connect())
  socket.on('next', () => Reveal.next())
  socket.on('prev', () => Reveal.prev())

  Reveal.addEventListener('slidechanged', () => {
    socket.emit('slidechanged', {
      notes: Reveal.getSlideNotes()
    })
  })
}

Remeal.init()
