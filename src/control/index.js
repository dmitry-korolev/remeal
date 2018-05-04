import { startTimer } from './timer'
import { postState, setupIframe } from './setupIframe'
import {
  CONNECT_EVENT,
  NEXT_EVENT, OVERVIEW_EVENT,
  PAUSE_EVENT,
  PREV_EVENT,
  REQUEST_RECONNECT_EVENT,
  SETSTATE_EVENT
} from '../constants'
import { loadScript } from '../loadScript'
import { bookmarkletUrl } from './bookmarkletUrl'

// HTML
const playCode = '<i class="material-icons">play_arrow</i>'
const pauseCode = '<i class="material-icons">pause</i>'

const init = (socket) => {
  // DOM nodes
  // Header
  const heading = document.getElementById('title')
  const count = document.getElementById('count')
  const indicator = document.getElementById('connected')
  const timer = document.getElementById('timer')

  // Body
  const presentationFrame = document.getElementById('frame')
  const speakerNotes = document.getElementById('notes')

  // Controls
  const prevButton = document.getElementById('prev')
  const nextButton = document.getElementById('next')
  const pauseButton = document.getElementById('pause')
  const overviewButton = document.getElementById('overview')

  socket.on('init', ({ title, url, notes, total, state }) => {
    indicator.classList.add('ok')
    heading.innerText = title

    setupIframe(url, presentationFrame)
    update({ notes, total, state })
    startTimer(timer)
  })

  const update = ({ title, notes, total, state }) => {
    const { indexh } = state
    speakerNotes.innerHTML = notes
    count.innerText = `${indexh + 1}/${total}`

    pauseButton.innerHTML = state.paused ? playCode : pauseCode

    postState(state)
  }

  indicator.setAttribute('href', bookmarkletUrl(document.location.origin))

  socket.on(CONNECT_EVENT, () => socket.emit(REQUEST_RECONNECT_EVENT))

  socket.on(SETSTATE_EVENT, ({ notes, total, state }) => {
    update({ notes, total, state })
  })

  prevButton.addEventListener('click', () => socket.emit(PREV_EVENT))
  nextButton.addEventListener('click', () => socket.emit(NEXT_EVENT))
  pauseButton.addEventListener('click', () => socket.emit(PAUSE_EVENT))
  overviewButton.addEventListener('click', () => socket.emit(OVERVIEW_EVENT))
  timer.addEventListener('click', () => startTimer(timer))
}

loadScript(document.location.origin +  '/socket.io/socket.io.js')
  .then(() => init(io(document.location.origin)))
  .catch(error => console.log(error))
