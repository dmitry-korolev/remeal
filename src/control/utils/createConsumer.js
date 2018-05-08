import shallowEqual from 'fbjs/lib/shallowEqual'
import { h, Component } from 'preact'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs/operators'
import { animationFrame } from 'rxjs/scheduler/animationFrame'

const consumers = {}
const identity = (x) => x
const defaultMergeProps = (a, b, c) => Object.assign({}, a, b, c)

/**
 * Creates Consumer component
 */
export const createConsumer = (app) => {
  if (consumers[app.name]) {
    return consumers[app.name]
  }

  return (consumers[app.name] = class Consumer extends Component {
    componentWillMount() {
      this.subscribe(this.props)
    }

    componentWillReceiveProps(nextProps) {
      if (
        this.props.mapState !== nextProps.mapState ||
        this.props.mapApi !== nextProps.mapApi ||
        this.props.mergeProps !== nextProps.mergeProps
      ) {
        this.subscribe(nextProps)
      }
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    subscribe(props) {
      this.unsubscribe()

      const mapState = props.mapState || identity
      const mapApi = props.mapApi || identity
      const mergeProps = props.mergeProps || defaultMergeProps

      const getResult = (state) => mergeProps(mapState(state), mapApi(app.api))

      this.subscription = app.state$
        .pipe(
          debounceTime(1000 / 60, animationFrame),
          startWith(app.getState()),
          map(getResult),
          distinctUntilChanged(shallowEqual)
        )
        .subscribe((result) => {
          this.setState(result)
          this.forceUpdate()
        })
    }

    unsubscribe() {
      this.subscription && this.subscription.unsubscribe()
    }

    render() {
      const renderProp = this.props.children[0]

      return renderProp(this.state)
    }
  })
}
