import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { timer, merge } from 'rxjs/observable'
import {
  map,
  mapTo,
  tap,
  takeUntil,
  switchMap,
  switchMapTo,
  throttleTime
} from 'rxjs/operators'
import { Subject } from 'rxjs/Subject'
import { wait } from '../../helpers/wait'
import { POINTER_MOVE_EVENT, POINTER_STOP_EVENT } from '../../constants'
import { sendCommand } from '../services/socket'
import { calculateCircle } from '../../helpers/calculateCircle'

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

const mapEvent = (event, sizes) => {
  event.preventDefault()
  const touches = event.touches[0]

  return {
    show: true,
    x: touches.clientX / sizes.width,
    y: (touches.clientY - sizes.top) / sizes.height
  }
}

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
    if (!this.props.enablePointer) {
      return
    }

    this.subscription = merge(
      this.handleStart$.pipe(
        map((event) => mapEvent(event, this.sizes)),
        switchMap(({ x, y }) =>
          timer(500).pipe(
            tap(({ x, y }) =>
              sendCommand(POINTER_MOVE_EVENT, {
                x,
                y,
                ratio: this.props.ratio || 0.1
              })
            ),
            switchMapTo(this.handleMove$),
            throttleTime(1000 / 30),
            map((event) => mapEvent(event, this.sizes)),
            tap(({ x, y }) =>
              sendCommand(POINTER_MOVE_EVENT, {
                x,
                y,
                ratio: this.props.ratio || 0.1
              })
            ),
            takeUntil(this.handleStop$)
          )
        )
      ),
      this.handleStop$.pipe(
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
    return (
      <Container
        onTouchStart={(event) => this.handleStart$.next(event)}
        onTouchEnd={() => this.handleStop$.next()}
        onTouchMove={(event) => this.handleMove$.next(event)}
        innerRef={this.setContainerRef}>
        {
          <Layer>
            <Overlay
              show={this.state.show}
              d={calculateCircle({
                width: this.sizes.width,
                height: this.sizes.height,
                x: this.state.x,
                y: this.state.y,
                ratio: this.props.ratio || 0.1
              })}
            />
          </Layer>
        }
      </Container>
    )
  }
}
