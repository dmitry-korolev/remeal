import { createEvent, createReducer } from 'stapp'
import { combineReducers } from 'redux'

const changeTheme = createEvent('Config: change theme')
const themeReducer = createReducer('dark').on(changeTheme, (_, theme) => theme)

const changeBlock = createEvent('Config: change block', (id, value) => ({
  id,
  value
}))
const blocksReducer = createReducer({
  blockA: 'presentation',
  blockB: 'notes',
  blockC: 'controls'
}).on(changeBlock, (blocks, { id, value }) => {
  const currentValue = blocks[id]
  const result = Object.assign({}, blocks, {
    [id]: value
  })

  if (value === 'disabled') {
    return result
  }

  const otherValues = Object.keys(blocks).filter((key) => key !== id)
  const sameBlock = otherValues.find((key) => blocks[key] === value)

  if (sameBlock) {
    result[sameBlock] = currentValue
  }

  return result
})

const toggleDialog = createEvent('Config: toggle config dialog')
const dialogReducer = createReducer(false).on(toggleDialog, (state) => !state)

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
