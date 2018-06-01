import styled from 'preact-emotion'

export const Button = styled.button`
  display: inline-block;
  height: 2em;
  line-height: 2em;
  background: transparent;
  color: var(--font-color);
  font-size: var(--font-size);
  border: 1px solid var(--border-color);

  &:active {
    background: var(--dialog-background);
  }

  &:focus {
    outline: #52796f auto 5px;
  }
`
