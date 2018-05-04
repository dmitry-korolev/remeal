let timerId = 0

const prepend = (value) => {
  return value.toString().length < 2 ? `0${value}` : value
}

export const startTimer = (timer) => {
  clearInterval(timerId)
  const time = new Date()
  timer.innerHTML = '00:00'

  timerId = setInterval(() => {
    const seconds = Math.round((new Date() - time) / 1000)

    timer.innerHTML = `${prepend(Math.floor(seconds / 60))}:${prepend(seconds % 60)}`
  }, 1000)
}
