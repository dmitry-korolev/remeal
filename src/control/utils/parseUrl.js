import { pick } from './pick'

export const parseUrl = (href) => {
  const l = document.createElement('a')

  l.href = href

  return pick(
    [
      'hash',
      'host',
      'hostname',
      'href',
      'pathname',
      'port',
      'protocol',
      'search'
    ],
    l
  )
}
