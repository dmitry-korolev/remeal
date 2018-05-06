const prepend = (value) => {
  return value.toString().length < 2 ? `0${value}` : value
}

const format = (seconds) => {
  return `${prepend(Math.floor(seconds / 60))}:${prepend(seconds % 60)}`
}

export const timer = (cb) => {
  let intervalId = -1
  let seconds = 0

  cb(format(seconds))

  const tick = () => {
    seconds += 1
    cb(format(seconds))
  }

  const isRunning = () => {
    return intervalId >= 0
  }

  const start = () => {
    intervalId = setInterval(() => tick(), 1000)
  }

  const pause = () => {
    if (!isRunning()) {
      return
    }
    clearInterval(intervalId)
    intervalId = -1
  }

  const resume = () => {
    if (isRunning()) {
      return
    }

    start()
  }

  const stop = () => {
    if (isRunning()) {
      clearInterval(intervalId)
      intervalId = -1
    }

    seconds = 0
    cb(format(seconds))
  }

  return {
    start,
    pause,
    resume,
    stop
  }
}
