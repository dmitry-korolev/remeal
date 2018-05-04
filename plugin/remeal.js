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
    state: Reveal.getState()
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

    socket.on('connect', () => socket.emit('init', collectData()))
    socket.on('requestreconnect', (data) => socket.emit('init', collectData()))
    socket.on('next', () => Reveal.next())
    socket.on('prev', () => Reveal.prev())
    socket.on('pause', () => Reveal.togglePause())
    socket.on('overview', () => Reveal.toggleOverview())

    const sendState = () => socket.emit('setstate', collectData())

    Reveal.addEventListener('slidechanged', sendState)
    Reveal.addEventListener('paused', sendState)
    Reveal.addEventListener('resumed', sendState)
    Reveal.addEventListener('overviewhidden', sendState)
    Reveal.addEventListener('overviewshown', sendState)
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

    if (event.key === 'r') {
      event.preventDefault()
      connect()
    }
  })
})()
