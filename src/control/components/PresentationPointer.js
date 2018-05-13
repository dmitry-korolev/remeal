import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { timer, merge } from 'rxjs/observable'
import {
  map,
  filter,
  mapTo,
  tap,
  switchMap,
  takeUntil,
  throttleTime
} from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { wait } from '../utils/wait'
import {
  POINTER_MOVE_EVENT,
  POINTER_START_EVENT,
  POINTER_STOP_EVENT
} from '../../constants'
import { sendCommand } from '../services/socket'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
`

const Layer = styled.svg`
  height: 100%;
  width: 100%;
`

const Overlay = styled.path`
  fill: rgba(0, 0, 0, 0.5);
  fill-rule: evenodd;
  stroke: none;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.2s ease;
`

export class PresentationPointer extends Component {
  state = {
    x: 0,
    y: 0,
    show: false
  }

  sizes = {
    top: 0,
    height: 0,
    width: 0
  }

  handleStart$ = new Subject()
  handleStop$ = new Subject()
  handleMove$ = new Subject()

  componentWillMount() {
    this.subscription = merge(
      this.handleStart$.pipe(
        filter(() => this.props.enablePointer),
        switchMap(() => timer(500).pipe(takeUntil(this.handleStop$))),
        tap(() => sendCommand(POINTER_START_EVENT)),
        switchMap(() => this.handleMove$.pipe(takeUntil(this.handleStop$))),
        throttleTime(1000 / 60),
        map((event) => {
          event.preventDefault()
          const touches = event.touches[0]

          return {
            show: true,
            x: touches.clientX / this.sizes.width,
            y: (touches.clientY - this.sizes.top) / this.sizes.height
          }
        }),
        tap(({ x, y }) => sendCommand(POINTER_MOVE_EVENT, { x, y }))
      ),
      this.handleStop$.pipe(
        filter(() => this.props.enablePointer),
        tap(() => sendCommand(POINTER_STOP_EVENT)),
        mapTo({ show: false })
      )
    ).subscribe((state) => this.setState(state))
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  setContainerRef = async (element) => {
    if (element) {
      await wait(25)
      const sizes = element.getBoundingClientRect()
      this.sizes = {
        top: Math.round(sizes.top),
        height: Math.round(sizes.height),
        width: Math.round(sizes.width)
      }
    } else {
      this.sizes = {}
    }
  }

  render() {
    const rx = this.sizes.height / 10
    return (
      <Container
        onTouchStart={() => this.handleStart$.next()}
        onTouchEnd={() => this.handleStop$.next()}
        onTouchMove={(event) => this.handleMove$.next(event)}
        innerRef={this.setContainerRef}>
        {
          <Layer>
            <Overlay
              show={this.state.show}
              d={`
                    M 0 0
                        L ${this.sizes.width} 0
                        L ${this.sizes.width} ${this.sizes.height}
                        L 0 ${this.sizes.height}
                    Z
                    M ${this.sizes.width * this.state.x} ${this.sizes.height *
                this.state.y}
                        m -${rx} 0
                        a ${rx},${rx} 0 1,0 ${rx * 2},0
                        a ${rx},${rx} 0 1,0 -${rx * 2},0
                    Z
                `}
            />
          </Layer>
        }
      </Container>
    )
  }
}
