import shallowEqual from 'fbjs/lib/shallowEqual'
import { Component } from 'preact'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs/operators'
import { animationFrame } from 'rxjs/scheduler/animationFrame'

const consumers = {}
const identity = (x) => x

/**
 * Creates Consumer component
 */
export const createConsumer = (app) => {
  return (consumers[app.name] =
    consumers[app.name] ||
    class Consumer extends Component {
      componentWillMount() {
        this.subscribe(this.props)
      }

      componentDidUpdate(nextProps) {
        if (
          this.props.mapState !== nextProps.mapState ||
          this.props.mapApi !== nextProps.mapApi
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

        this.subscription = app.state$
          .pipe(
            debounceTime(1000 / 60, animationFrame),
            startWith(app.getState()),
            map((state) => mapState(state, app.api)),
            distinctUntilChanged(shallowEqual)
          )
          .subscribe((result) => {
            this.appState = result
            this.forceUpdate()
          })

        this.appApi = mapApi(app.api)
      }

      unsubscribe() {
        this.subscription && this.subscription.unsubscribe()
      }

      render() {
        const renderProp = this.props.children[0]

        return renderProp(this.appState, this.appApi)
      }
    })
}
