import {
  CONNECT_EVENT,
  INIT_EVENT,
  NEXT_EVENT,
  OVERVIEW_EVENT,
  PAUSE_EVENT,
  PRESENTATION,
  PREV_EVENT,
  REQUEST_RECONNECT_EVENT,
  REVEAL_EVENTS,
  SETSTATE_EVENT
} from '../constants'
import { loadScript } from '../loadScript'

const collectData = () => ({
  title: document.title,
  url: document.location.href,
  notes: Reveal.getSlideNotes(),
  total: Reveal.getTotalSlides(),
  state: Reveal.getState()
})

const connect = (socket) => {
  socket.on(CONNECT_EVENT, () => socket.emit(INIT_EVENT, collectData()))
  socket.on(REQUEST_RECONNECT_EVENT, () =>
    socket.emit(INIT_EVENT, collectData())
  )
  socket.on(NEXT_EVENT, () => Reveal.next())
  socket.on(PREV_EVENT, () => Reveal.prev())
  socket.on(PAUSE_EVENT, () => Reveal.togglePause())
  socket.on(OVERVIEW_EVENT, () => Reveal.toggleOverview())

  const sendState = () => socket.emit(SETSTATE_EVENT, collectData())

  REVEAL_EVENTS.forEach((event) => {
    Reveal.addEventListener(event, sendState)
  })
}

const load = (url) => {
  if ('io' in window) {
    return
  }

  url = url || prompt('Enter socket.io server url')

  if (!url) {
    return
  }

  loadScript(url + '/socket.io/socket.io.js')
    .then(() =>
      connect(
        io(url, {
          query: { type: PRESENTATION }
        })
      )
    )
    .catch((error) => console.log(error))
}

const init = (url, force) => {
  if (document.location.origin === url) {
    return
  }

  if (force) {
    load(url)
    return
  }

  document.addEventListener('keydown', (event) => {
    if (
      document.querySelector(':focus') !== null ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return
    }

    // Disregard the event if keyboard is disabled
    if (Reveal.getConfig().keyboard === false) {
      return
    }

    if (event.key === 'r') {
      event.preventDefault()

      load(url)
    }
  })
}

window.initRemeal = init
