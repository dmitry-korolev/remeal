import { Slim } from 'slim-js'
import { tag, template, useShadow } from 'slim-js/Decorators'
import { throttle } from '../helpers/throttle'
import { calculateCircle } from '../helpers/calculateCircle'

@tag('pointer-overlay')
@useShadow(true)
@template(`
<style>
  div {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9999;
  }
  
  path {
    fill: rgba(0, 0, 0, 0.5);
    fill-rule: evenodd;
    stroke: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
</style>
<div>
  <svg s:id="overlay" height=${window.innerHeight} width=${window.innerWidth}>
    <path s:id="path" />
  </svg>
</div>
`)
export class Overlay extends Slim {
  onCreated() {
    this.timeoutId = 0
    window.addEventListener('resize', this.updateOverlay)
  }

  updateTimeout() {
    clearTimeout(this.timeoutId)
    this.timeoutId = setTimeout(() => this.hide(), 3000)
  }

  hide() {
    this.path.style.opacity = 0
  }

  updateOverlay = throttle(1000 / 30, () => {
    window.requestAnimationFrame(() => {
      this.overlay.setAttribute('height', window.innerHeight)
      this.overlay.setAttribute('width', window.innerWidth)
    })
  })

  move({ x, y, ratio }) {
    this.updateTimeout()
    window.requestAnimationFrame(() => {
      this.path.setAttribute(
        'd',
        calculateCircle({
          height: window.innerHeight,
          width: window.innerWidth,
          x,
          y,
          ratio
        })
      )
      this.path.style.opacity = 1
    })
  }
}
