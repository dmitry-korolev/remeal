import {
  map,
  mapTo,
  tap,
  take,
  takeUntil,
  sample,
  filter,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators'
import { merge, timer } from 'rxjs/observable'
import { createEvent, createReducer, combineEpics, select } from 'stapp'
import { init$, presentationDisconnect$, setState$ } from './events'
import { pauseTimer, startTimer } from '../stopWatch/module'
import {
  NEXT_EVENT,
  OVERVIEW_EVENT,
  PAUSE_EVENT,
  PREV_EVENT
} from '../../../constants'
import { sendCommand } from '../../services/socket'

const setState = createEvent('Presentation: set state')
const presentationStateReducer = createReducer({
  title: '…',
  status: 'disconnected'
}).on(setState, (state, payload) => Object.assign({}, state, payload))

const initEpic = () => init$.pipe(mapTo(startTimer()))

const onDisconnect = () =>
  presentationDisconnect$.pipe(
    mapTo(
      setState({
        status: 'disconnected'
      })
    )
  )

const onChange = () =>
  merge(init$, setState$).pipe(
    map(({ title, url, notes, total, state }) =>
      setState(
        Object.assign({}, state, {
          title,
          status: 'connected',
          total,
          notes,
          url
        })
      )
    )
  )

const vibrateEpic = (_, state$) =>
  state$.pipe(
    sample(setState$),
    filter((state) => state.config.vibration),
    tap(() => navigator.vibrate(250)),
    mapTo(null)
  )

const startPending = createEvent('Presentation: start pending')
const pendingEpic = (event$) =>
  select(startPending, event$).pipe(
    switchMap(() => {
      return timer(2000, 2000).pipe(
        take(2),
        takeUntil(
          merge(
            presentationDisconnect$,
            init$,
            setState$,
            select(command, event$)
          )
        ),
        map((index) =>
          setState({
            status: index === 0 ? 'pending' : 'disconnected'
          })
        )
      )
    })
  )

const command = createEvent('Presentation: command')
const onCommandEpic = command.epic((command$) =>
  command$.pipe(
    tap(({ payload }) => sendCommand(payload)),
    mapTo(startPending())
  )
)

const onPauseEpic = (_, state$) =>
  state$.pipe(
    map((state) => state.presentation.paused),
    distinctUntilChanged(),
    map((paused) => (paused ? pauseTimer() : startTimer()))
  )

export const presentationState = {
  name: 'Presentation state',
  api: {
    controls: {
      next: () => command(NEXT_EVENT),
      prev: () => command(PREV_EVENT),
      pause: () => command(PAUSE_EVENT),
      overview: () => command(OVERVIEW_EVENT)
    }
  },
  epic: combineEpics([
    initEpic,
    onDisconnect,
    onChange,
    onCommandEpic,
    pendingEpic,
    onPauseEpic,
    vibrateEpic
  ]),
  state: {
    presentation: presentationStateReducer
  }
}
