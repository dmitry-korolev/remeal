import { createEvent, createReducer } from 'stapp'
import { combineReducers } from 'redux'

const changeTheme = createEvent('Config: change theme')
const themeReducer = createReducer('dark').on(changeTheme, (_, theme) => theme)

const changeBlock = createEvent('Config: change block')
const blocksReducer = createReducer({
  presentation: -1,
  notes: 0,
  controls: 1
}).on(changeBlock, (blocks, newBlocks) => {
  const keys = Object.keys(newBlocks)
  const changedFields = keys.filter(
    (field) => blocks[field] !== newBlocks[field]
  )

  return changedFields.length !== 0
    ? Object.assign({}, blocks, newBlocks)
    : blocks
})

const toggleDialog = createEvent('Config: toggle config dialog')
const dialogReducer = createReducer(true).on(toggleDialog, (state) => !state)

const toggleVibration = createEvent('Config: toggle vibration')
const vibrationReducer = createReducer(true).on(
  toggleVibration,
  (state) => !state
)

export const config = () => ({
  name: 'Config',
  api: {
    changeTheme,
    changeBlock,
    toggleDialog,
    toggleVibration
  },
  state: {
    config: combineReducers({
      theme: themeReducer,
      blocks: blocksReducer,
      dialogOpened: dialogReducer,
      vibration: vibrationReducer
    })
  }
})
