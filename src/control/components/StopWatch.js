import { h } from 'preact'

export const StopWatch = ({ seconds, onClick }) => (
  <div onClick={onClick}>
    {`${prepend(Math.floor(seconds / 60))}:${prepend(seconds % 60)}`}
  </div>
)

const prepend = (value) => {
  return value.toString().length < 2 ? `0${value}` : value
}
