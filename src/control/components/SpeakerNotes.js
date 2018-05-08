import { h } from 'preact'
import styled from 'preact-emotion'

const Container = styled.div`
  padding: var(--padding);
`

const createMarkup = (notes) => {
  return { __html: notes }
}

export const SpeakerNotes = ({ notes }) => (
  <Container dangerouslySetInnerHTML={createMarkup(notes)} />
)
