let frame

export const setupIframe = (url, presentationFrame) => {
  frame && frame.remove()
  frame = document.createElement('iframe')
  frame.setAttribute('border', '0')
  frame.setAttribute('height', presentationFrame.offsetHeight)
  frame.setAttribute('width', presentationFrame.offsetWidth)
  frame.setAttribute('src', url)

  presentationFrame.appendChild(frame)
}

export const postState = (state) => {
  frame && frame.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [state] }), '*' )
}
