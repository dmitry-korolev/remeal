import styled from 'preact-emotion'

export const Checkbox = styled.div`
  user-select: none;

  /* Base for label styling */
  [type='checkbox'] {
    position: absolute;
    left: -9999px;
  }

  label {
    position: relative;
    padding-right: 2em;
    cursor: pointer;
  }

  /* checkbox aspect */
  label:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1.2em;
    height: 1.2em;

    border: 1px solid var(--border-color);
    background: transparent;
  }

  /* checked mark aspect */
  label:after {
    content: '';
    position: absolute;
    top: calc(0.1em + 1px);
    right: calc(0.35em + 1px);
    width: 5px;
    height: 10px;
    border: solid transparent;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  /* checked mark aspect changes */
  [type='checkbox']:checked + label:after {
    border-color: var(--border-color);
  }

  [type='checkbox']:focus + label:before {
    outline: #52796f auto 5px;
  }

  /* hover style just for information */
  label:hover:before {
    background: var(--dialog-background);
  }
`
