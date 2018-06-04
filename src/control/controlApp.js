import { createApp } from 'stapp'
import { persist, toAsync } from 'stapp/lib/modules/persist'
import { stopWatch } from './modules/stopWatch/module'
import { presentationState } from './modules/presentation/module'
import { createConsumer } from '../helpers/preact/createConsumer'
import { config } from './modules/config/module'

const app = createApp({
  name: 'Control panel',
  modules: [
    persist({
      key: 'remeal',
      storage: toAsync(window.localStorage),
      whiteList: ['config']
    }),
    presentationState,
    stopWatch,
    config()
  ]
})

window.app = app

export const Consumer = createConsumer(app)
