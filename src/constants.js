// Common events
export const CONNECTION_EVENT = 'connection'
export const CONNECT_EVENT = 'connect'
export const DISCONNECT_EVENT = 'disconnect'

// Remote events
export const PREV_EVENT = 'prev'
export const NEXT_EVENT = 'next'
export const PAUSE_EVENT = 'pause'
export const OVERVIEW_EVENT = 'overview'
export const REQUEST_RECONNECT_EVENT = 'requestreconnect'
export const POINTER_STOP_EVENT = 'pointer_stop'
export const POINTER_MOVE_EVENT = 'pointer_move'
export const REMOTE_EVENTS = [
  PREV_EVENT,
  NEXT_EVENT,
  PAUSE_EVENT,
  OVERVIEW_EVENT,
  REQUEST_RECONNECT_EVENT,
  POINTER_STOP_EVENT,
  POINTER_MOVE_EVENT
]

// Presentation events
export const INIT_EVENT = 'init'
export const SETSTATE_EVENT = 'setstate'
export const PRESENTATION_DISCONNECTED_EVENT = 'presentation_disconnected'
export const PRESENTATION_EVENTS = [INIT_EVENT, SETSTATE_EVENT]

// Reveal events
export const SLIDE_CHANGED_EVENT = 'slidechanged'
export const PAUSED_EVENT = 'paused'
export const RESUMED_EVENT = 'resumed'
export const OVERVIEW_HIDDEN_EVENT = 'overviewhidden'
export const OVERVIEW_SHOWN_EVENT = 'overviewshown'
export const FRAGMENT_HIDDEN_EVENT = 'fragmenthidden'
export const FRAGMENT_SHOWN_EVENT = 'fragmentshown'
export const REVEAL_EVENTS = [
  SLIDE_CHANGED_EVENT,
  PAUSED_EVENT,
  RESUMED_EVENT,
  OVERVIEW_HIDDEN_EVENT,
  OVERVIEW_SHOWN_EVENT,
  FRAGMENT_HIDDEN_EVENT,
  FRAGMENT_SHOWN_EVENT
]

// Types
export const PRESENTATION = 'presentation'
export const REMOTE = 'remote'
