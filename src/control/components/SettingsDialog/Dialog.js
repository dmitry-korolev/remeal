import styled from 'preact-emotion'

export const Dialog = styled.dialog`
  width: calc(100vw - 4em);
  left: 2em;
  top: 2em;
  margin: 0;
  border-color: var(--border-color);
  background-color: var(--dialog-background);
  color: var(--font-color);
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.75);
  z-index: 999;

  max-height: calc(100vh - 4em);
  overflow: scroll;

  form *:focus {
    outline: #52796f auto 5px;
  }

  select {
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: 0;
    height: 1.6em;
    color: var(--font-color);
    font-size: var(--font-size);
  }
`

export const DialogClose = styled.span`
  position: absolute;
  top: 1em;
  right: 1em;
`
