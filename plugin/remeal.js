(function() {
  // ignore iframes
  if(window.parent !== window) {
    return
  }

  let socket

  const collectData = () => ({
    title: document.title,
    url: document.location.href,
    notes: Reveal.getSlideNotes(),
    total: Reveal.getTotalSlides(),
    indices: Reveal.getIndices()
  })

  const connect = () => {
    if (socket) {
      return
    }

    const url = prompt('Enter socket.io server url')

    if (!url) {
      return
    }

    socket = io(url)


    socket.on('connect', () => socket.emit('connected', collectData()))
    socket.on('requestreconnect', () => socket.emit('connected', collectData()))
    socket.on('next', () => Reveal.next())
    socket.on('prev', () => Reveal.prev())

    Reveal.addEventListener('slidechanged', () => {
      socket.emit('slidechanged', collectData())
    })
  }

  document.addEventListener('keydown', (event) => {
    if (
      document.querySelector(':focus') !== null
      || event.shiftKey
      || event.altKey
      || event.ctrlKey
      || event.metaKey
    ) {
      return
    }

    // Disregard the event if keyboard is disabled
    if (Reveal.getConfig().keyboard === false) {
      return
    }

    if (event.key === 'c') {
      event.preventDefault()
      connect()
    }
  })
})()
