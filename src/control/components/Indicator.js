import { h } from 'preact'
import styled from 'preact-emotion'

const Container = styled.div`
  width: calc(var(--padding) * 5);
  text-align: center;
`

const IndicatorDot = styled.span`
  display: inline-block;
  height: var(--padding);
  width: var(--padding);

  border-radius: 50%;

  background-color: ${({ status }) =>
    status === 'connected'
      ? '#0f0'
      : status === 'disconnected' ? '#f00' : '#ff0'};
`

export const Indicator = ({ status }) => (
  <Container>
    <IndicatorDot status={status} />
  </Container>
)
