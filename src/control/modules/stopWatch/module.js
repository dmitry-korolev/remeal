import { interval } from 'rxjs/observable'
import { map, switchMap, takeUntil } from 'rxjs/operators'
import { createEvent, createReducer, select, selectArray } from 'stapp'

const tick = createEvent('Stopwatch: tick')
export const startTimer = createEvent('Stopwatch: start')
export const stopTimer = createEvent('Stopwatch: stop')
export const pauseTimer = createEvent('Stopwatch: pause')

const stopWatchReducer = createReducer(0)
  .on(tick, (seconds) => seconds + 1)
  .reset(stopTimer)

export const stopWatch = {
  name: 'Stopwatch',
  api: {
    sw: {
      start: startTimer,
      stop: stopTimer,
      pause: pauseTimer
    }
  },
  state: {
    stopWatch: stopWatchReducer
  },
  epic: (event$) => {
    return select(startTimer, event$).pipe(
      switchMap(() =>
        interval(1000).pipe(
          takeUntil(selectArray([pauseTimer, stopTimer], event$))
        )
      ),
      map(() => tick())
    )
  }
}
