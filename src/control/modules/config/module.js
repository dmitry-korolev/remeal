import { createEvent, createReducer } from 'stapp'
import { combineReducers } from 'redux'

const resetConfig = createEvent('Config: reset')
const changeTheme = createEvent('Config: change theme')
const themeReducer = createReducer('dark')
  .on(changeTheme, (_, theme) => theme)
  .reset(resetConfig)

const changeBlock = createEvent('Config: change block')
const blocksReducer = createReducer({
  presentation: 0,
  notes: 1,
  controls: 2
})
  .on(changeBlock, (blocks, newBlocks) => {
    const keys = Object.keys(newBlocks)
    const changedFields = keys.filter(
      (field) => blocks[field] !== newBlocks[field]
    )

    return changedFields.length !== 0
      ? Object.assign({}, blocks, newBlocks)
      : blocks
  })
  .reset(resetConfig)

const toggleDialog = createEvent('Config: toggle config dialog')
const dialogReducer = createReducer(false).on(toggleDialog, (state) => !state)

const togglePointer = createEvent('Config: toggle pointer')
const pointerReducer = createReducer(true)
  .on(togglePointer, (state) => !state)
  .reset(resetConfig)

const toggleVibration = createEvent('Config: toggle vibration')
const vibrationReducer = createReducer(true)
  .on(toggleVibration, (state) => !state)
  .reset(resetConfig)

const changeRatio = createEvent('Config: change highlight ratio')
const ratioReducer = createReducer(0.2)
  .on(changeRatio, (_, payload) => payload)
  .reset(resetConfig)

export const config = () => ({
  name: 'Config',
  api: {
    configApi: {
      changeTheme,
      changeBlock,
      changeRatio,
      toggleDialog,
      toggleVibration,
      togglePointer,
      resetConfig
    }
  },
  state: {
    config: combineReducers({
      theme: themeReducer,
      blocks: blocksReducer,
      dialogOpened: dialogReducer,
      vibration: vibrationReducer,
      pointer: pointerReducer,
      ratio: ratioReducer
    })
  }
})
