export const INDICATOR_STATES = {
  DISCONNECTED: 'DISCONNECTED',
  PENDING: 'PENDING',
  CONNECTED: 'CONNECTED',
}

export const indicator = (cb) => {
  let timerId = -1

  const startPending = () => {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      cb(INDICATOR_STATES.PENDING)

      timerId = setTimeout(() => {
        cb(INDICATOR_STATES.DISCONNECTED)
      }, 2000)
    }, 2000)
  }

  const connect = () => {
    clearTimeout(timerId)
    cb(INDICATOR_STATES.CONNECTED)
  }

  const disconnect = () => {
    clearTimeout(timerId)
    cb(INDICATOR_STATES.DISCONNECTED)
  }

  return {
    startPending,
    connect,
    disconnect
  }
}
