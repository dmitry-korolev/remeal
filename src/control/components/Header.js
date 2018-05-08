import { h } from 'preact'
import styled from 'preact-emotion'
import { createSelector, createStructuredSelector } from 'reselect'
import { Consumer } from '../controlApp'
import { StopWatch } from './StopWatch'
import { Indicator } from './Indicator'
import { Title } from './Title'
import { SettingsDialog } from './SettingsDialog'

const Container = styled.header`
  position: relative;
  height: var(--header-height);
  display: flex;

  > * {
    line-height: calc(var(--header-height) - var(--padding) * 2);
    margin: 0;
    padding: var(--padding);
  }
`

const titleSelector = createSelector(
  (state) => state.presentation.title,
  (title) => ({ title })
)

const statusSelector = createSelector(
  (state) => state.presentation.status,
  (status) => ({ status })
)

const totalSelector = createStructuredSelector({
  current: (state) => state.presentation.indexh + 1,
  total: (state) => state.presentation.total
})

export const Header = () => {
  return (
    <Container>
      <Consumer mapState={titleSelector}>
        {({ title }) => <Title>{title}</Title>}
      </Consumer>

      <Consumer mapState={totalSelector}>
        {({ current, total }) => (
          <div>
            {current}/{total}
          </div>
        )}
      </Consumer>

      <Consumer
        mergeProps={(state, api) => ({
          seconds: state.stopWatch,
          restart: () => {
            api.sw.stop()
            api.sw.start()
          }
        })}
      >
        {({ seconds, restart }) => (
          <StopWatch seconds={seconds} onClick={restart} />
        )}
      </Consumer>

      <Consumer mapState={(state) => state.config}>
        {({
          theme,
          blocks,
          dialogOpened,
          toggleDialog,
          changeTheme,
          changeBlock
        }) => (
          <SettingsDialog
            theme={theme}
            blocks={blocks}
            dialogOpened={dialogOpened}
            onOpenClick={toggleDialog}
            onCloseClick={toggleDialog}
            onThemeChange={changeTheme}
            onBlockChange={changeBlock}
          />
        )}
      </Consumer>

      <Consumer mapState={statusSelector}>
        {({ status }) => <Indicator status={status} />}
      </Consumer>
    </Container>
  )
}
