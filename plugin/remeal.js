const Remeal = {}

Remeal.init = () => {
  // ignore iframes
  if(window.parent !== window) {
    return
  }

  const url = prompt('Enter socket.io server url')

  if (!url) {
    return
  }

  const socket = io(url)

  const collectData = () => ({
    title: document.title,
    url: document.location.href,
    notes: Reveal.getSlideNotes(),
    total: Reveal.getTotalSlides(),
    indices: Reveal.getIndices()
  })

  socket.on('connect', () => socket.emit('connected', collectData()))
  socket.on('requestreconnect', () => socket.emit('connected', collectData()))
  socket.on('next', () => Reveal.next())
  socket.on('prev', () => Reveal.prev())

  Reveal.addEventListener('slidechanged', () => {
    socket.emit('slidechanged', collectData())
  })
}

Remeal.init()
