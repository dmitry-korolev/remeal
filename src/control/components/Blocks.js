import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { createSelector, createStructuredSelector } from 'reselect'
import { SpeakerNotes } from './SpeakerNotes'
import { Consumer } from '../controlApp'
import { PresentationFrame } from './PresentationFrame'
import { Controls } from './Controls'
import { Bookmarklet } from './Bookmarklet'

const BlocksContainer = styled.div`
  height: var(--blocks-height);

  & > * {
    width: 100%;
    border-top: 2px solid var(--border-color);
    overflow: scroll;
    height: calc(var(--blocks-height) / ${(props) => props.children.length});
  }
`

const pickStateSelector = createStructuredSelector({
  indexh: (state) => state.presentation.indexh,
  indexv: (state) => state.presentation.indexv,
  indexf: (state) => state.presentation.indexf,
  paused: (state) => state.presentation.paused,
  overview: (state) => state.presentation.overview
})

const presentationSelector = createSelector(
  (state) => state.presentation.url,
  pickStateSelector,
  (url, state) => ({ url, state })
)

const pausedSelector = createSelector(
  (state) => state.presentation.paused,
  (paused) => ({ paused })
)

const notesSelector = createSelector(
  (state) => state.presentation.notes,
  (notes) => ({ notes })
)

const blocksSelector = createSelector(
  (state) => state.config.blocks,
  (blocks) => ({
    blocks: Object.values(blocks).filter((value) => value !== 'disabled')
  })
)

const connectedSelector = createSelector(
  (state) => state.presentation.status,
  (status) => ({ connected: status !== 'disconnected' })
)

export class Blocks extends Component {
  renderBookmarklet() {
    return <Bookmarklet src={document.location.origin} />
  }

  renderNotes() {
    return (
      <Consumer mapState={notesSelector}>
        {({ notes }) => (
          <div>
            <SpeakerNotes notes={notes} />
          </div>
        )}
      </Consumer>
    )
  }

  renderFrame() {
    return (
      <Consumer mapState={presentationSelector}>
        {({ url, state }) => (
          <div>
            <PresentationFrame state={state} url={url} />
          </div>
        )}
      </Consumer>
    )
  }

  renderControls() {
    return (
      <Consumer mapState={pausedSelector}>
        {({ paused, controls }) => (
          <Controls
            onPrevClick={controls.prev}
            onNextClick={controls.next}
            onOverviewClick={controls.overview}
            onPauseClick={controls.pause}
            paused={paused}
          />
        )}
      </Consumer>
    )
  }

  renderBlocks() {
    return (
      <Consumer mapState={blocksSelector}>
        {({ blocks }) => (
          <BlocksContainer>
            {blocks.map((block) => {
              if (block === 'notes') return this.renderNotes()
              if (block === 'presentation') return this.renderFrame()
              if (block === 'controls') return this.renderControls()
            })}
          </BlocksContainer>
        )}
      </Consumer>
    )
  }

  render() {
    return (
      <div>
        <Consumer mapState={connectedSelector}>
          {({ connected }) =>
            connected ? this.renderBlocks() : this.renderBookmarklet()
          }
        </Consumer>
      </div>
    )
  }
}
