import { Slim } from 'slim-js'
import { tag, template, useShadow } from 'slim-js/Decorators'

const calculateCicle = ({ x, y }) => {
  const height = window.innerHeight
  const width = window.innerWidth
  const radius = height / 10

  return `
    M 0 0
      L ${width} 0
      L ${width} ${height}
      L 0 ${height}
    Z
    M ${width * x} ${height * y}
      m -${radius} 0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      a ${radius},${radius} 0 1,0 -${radius * 2},0
    Z
  `
}

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
<div s:id="container">
  <svg height=${window.innerHeight} width=${window.innerWidth}>
    <path s:id="path" />
  </svg>
</div>
`)
export class Overlay extends Slim {
  onCreated() {
    this.move({ x: 0, y: 0 })
  }

  show() {
    this.path.style.opacity = 1
  }

  hide() {
    this.path.style.opacity = 0
  }

  move({ x, y }) {
    this.path.setAttribute('d', calculateCicle({ x, y }))
  }
}
