import { postState, setupIframe } from './setupIframe'
import {
  CONNECT_EVENT,
  INIT_EVENT,
  NEXT_EVENT,
  OVERVIEW_EVENT,
  PAUSE_EVENT,
  PRESENTATION_DISCONNECTED_EVENT,
  PREV_EVENT,
  REMOTE,
  REQUEST_RECONNECT_EVENT,
  SETSTATE_EVENT
} from '../constants'
import { loadScript } from '../loadScript'
import { bookmarkletUrl } from './bookmarkletUrl'
import { timer } from './timer'
import { indicator, INDICATOR_STATES } from './indicator'

// HTML
const playCode = '<i class="material-icons">play_arrow</i>'
const pauseCode = '<i class="material-icons">pause</i>'

const init = (socket) => {
  // DOM nodes
  // Header
  const $heading = document.getElementById('title')
  const $count = document.getElementById('count')
  const $indicator = document.getElementById('connected')
  const $timer = document.getElementById('timer')

  // Body
  const $bookmarklet = document.getElementById('bookmarklet')
  const $presentationFrame = document.getElementById('frame')
  const $speakerNotes = document.getElementById('notes')

  // Controls
  const $prevButton = document.getElementById('prev')
  const $nextButton = document.getElementById('next')
  const $pauseButton = document.getElementById('pause')
  const $overviewButton = document.getElementById('overview')

  // Setup timer
  const timerInstance = timer((time) => ($timer.innerHTML = time))
  $timer.addEventListener('click', () => timerInstance.start())

  // Setup indicator
  const indicatorInstance = indicator((state) => {
    switch (state) {
      case INDICATOR_STATES.DISCONNECTED:
        $indicator.classList.add('disconnected')
        $indicator.classList.remove('connected')
        $indicator.classList.remove('pending')
        break

      case INDICATOR_STATES.CONNECTED:
        $indicator.classList.remove('disconnected')
        $indicator.classList.add('connected')
        $indicator.classList.remove('pending')
        break

      case INDICATOR_STATES.PENDING:
        $indicator.classList.remove('disconnected')
        $indicator.classList.remove('connected')
        $indicator.classList.add('pending')
        break
    }
  })

  const emit = (event) => {
    socket.emit(event)
    indicatorInstance.startPending()
  }

  const update = ({ title, notes, total, state }) => {
    const { indexh } = state
    indicatorInstance.connect()
    $speakerNotes.innerHTML = notes
    $count.innerText = `${indexh + 1}/${total}`

    state.paused ? timerInstance.pause() : timerInstance.resume()
    $pauseButton.innerHTML = state.paused ? playCode : pauseCode

    postState(state)
  }

  // Setup bookmarklet
  $bookmarklet.setAttribute('href', bookmarkletUrl(document.location.origin))

  // Subscribe on presentation events
  socket.on(INIT_EVENT, ({ title, url, notes, total, state }) => {
    $indicator.classList.add('ok')
    $heading.innerText = title

    setupIframe(url, $presentationFrame)
    update({ notes, total, state })
  })
  socket.on(CONNECT_EVENT, () => emit(REQUEST_RECONNECT_EVENT))
  socket.on(PRESENTATION_DISCONNECTED_EVENT, () =>
    indicatorInstance.disconnect()
  )
  socket.on(SETSTATE_EVENT, ({ notes, total, state }) => {
    update({ notes, total, state })
  })

  // Subscribe on click events
  $prevButton.addEventListener('click', () => emit(PREV_EVENT))
  $nextButton.addEventListener('click', () => emit(NEXT_EVENT))
  $pauseButton.addEventListener('click', () => emit(PAUSE_EVENT))
  $overviewButton.addEventListener('click', () => emit(OVERVIEW_EVENT))
}

loadScript(document.location.origin + '/socket.io/socket.io.js')
  .then(() =>
    init(
      io(document.location.origin, {
        query: { type: REMOTE }
      })
    )
  )
  .catch((error) => console.log(error))
