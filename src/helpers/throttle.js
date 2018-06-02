export const throttle = (wait, func) => {
  let timeoutId

  return function(...args) {
    if (timeoutId) {
      return
    }

    func.apply(this, args)
    timeoutId = window.setTimeout(() => {
      timeoutId = null
    }, wait)
  }
}
