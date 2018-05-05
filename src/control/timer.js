const prepend = (value) => {
  return value.toString().length < 2 ? `0${value}` : value
}

export class Timer {
  constructor(cb) {
    this.cb = cb
    this.cb('00:00')

    this.intervalId = 0
    this.seconds = 0
    this.state = 'PENDING'
  }

  start(time = +new Date()) {
    clearInterval(this.intervalId)
    this.state = 'RUNNING'
    this.startTime = time
    this.intervalId = setInterval(() => this.tick(), 1000)
  }

  pause() {
    if (this.state === 'PAUSED') {
      return
    }

    clearInterval(this.intervalId)
    this.state = 'PAUSED'
  }

  resume() {
    if (this.state === 'RUNNING') {
      return
    }

    this.start(this.startTime)
  }

  stop() {
    clearInterval(this.intervalId)
    this.state = 'PENDING'
    this.cb('00:00')
  }

  tick() {
    this.seconds += 1
    this.cb(
      `${prepend(Math.floor(this.seconds / 60))}:${prepend(this.seconds % 60)}`
    )
  }
}
