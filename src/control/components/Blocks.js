import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { createSelector, createStructuredSelector } from 'reselect'
import { SpeakerNotes } from './SpeakerNotes'
import { Consumer } from '../controlApp'
import { PresentationFrame } from './PresentationFrame'
import { Controls } from './Controls'
import { Bookmarklet } from './Bookmarklet'

const BlocksContainer = styled.div`
  display:flex;
  flex-direction: column;
  height: var(--blocks-height);

  & > * {
    width: 100%;
    border-top: 2px solid var(--border-color);
    overflow: scroll;
    height: calc(var(--blocks-height) / ${(props) => props.children.length});
  }
`

const BlockContainer = styled.div`
  order: ${props => props.order};
  flex-grow: 1;
  display: ${props => props.order < 0 ? 'none' : 'block'};
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
  (blocks) => ({ blocks })
)

const connectedSelector = createSelector(
  (state) => state.presentation.status,
  (status) => ({ connected: status !== 'disconnected' })
)

export class Blocks extends Component {
  renderBookmarklet() {
    return <Bookmarklet url={document.location.origin} />
  }

  renderNotes(index) {
    return (
      <Consumer mapState={notesSelector}>
        {({ notes }) => (
          <BlockContainer order={index}>
            <SpeakerNotes notes={notes} />
          </BlockContainer>
        )}
      </Consumer>
    )
  }

  renderFrame(index) {
    return (
      <Consumer mapState={presentationSelector}>
        {({ url, state }) => (
          <BlockContainer order={index}>
            <PresentationFrame state={state} url={url} />
          </BlockContainer>
        )}
      </Consumer>
    )
  }

  renderControls(index) {
    return (
      <Consumer mapState={pausedSelector}>
        {({ paused, controls }) => (
          <BlockContainer order={index}>
            <Controls
              onPrevClick={controls.prev}
              onNextClick={controls.next}
              onOverviewClick={controls.overview}
              onPauseClick={controls.pause}
              paused={paused}
            />
          </BlockContainer>
        )}
      </Consumer>
    )
  }

  renderBlocks() {
    return (
      <Consumer mapState={blocksSelector}>
        {({ blocks }) => (
          <BlocksContainer>
            { this.renderFrame(blocks['presentation']) }
            { this.renderNotes(blocks['notes']) }
            { this.renderControls(blocks['controls']) }
          </BlocksContainer>
        )}
      </Consumer>
    )
  }

  render() {
    return (
      <Consumer mapState={connectedSelector}>
        {({ connected }) =>
          connected ? this.renderBlocks() : this.renderBookmarklet()
        }
      </Consumer>
    )
  }
}
