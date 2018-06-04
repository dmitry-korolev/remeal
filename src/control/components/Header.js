import { h } from 'preact'
import styled from 'preact-emotion'
import { createSelector, createStructuredSelector } from 'reselect'
import { Consumer } from '../controlApp'
import { StopWatch } from './StopWatch'
import { Indicator } from './Indicator'
import { Title } from './Title'
import { SettingsDialog } from './SettingsDialog/SettingsDialog'

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

const totalSelector = createStructuredSelector({
  current: (state) => state.presentation.indexh + 1,
  total: (state) => state.presentation.total
})

export const Header = () => {
  return (
    <Container>
      <Consumer mapState={(state) => state.presentation.title}>
        {(title) => <Title>{title}</Title>}
      </Consumer>

      <Consumer mapState={totalSelector}>
        {({ current, total }) => (
          <div>
            {current || 0}/{total || 0}
          </div>
        )}
      </Consumer>

      <Consumer
        mapState={(state) => state.stopWatch}
        mapApi={(api) => () => {
          api.sw.stop()
          api.sw.start()
        }}>
        {(seconds, restart) => (
          <StopWatch seconds={seconds} onClick={restart} />
        )}
      </Consumer>

      <Consumer mapState={(state) => state.config}>
        {(
          { theme, blocks, dialogOpened, vibration, pointer, ratio },
          { configApi }
        ) => (
          <SettingsDialog
            theme={theme}
            blocks={blocks}
            dialogOpened={dialogOpened}
            vibration={vibration}
            pointer={pointer}
            configApi={configApi}
            ratio={ratio}
          />
        )}
      </Consumer>

      <Consumer mapState={(state) => state.presentation.status}>
        {(status) => <Indicator status={status} />}
      </Consumer>
    </Container>
  )
}
