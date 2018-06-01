import styled from 'preact-emotion'

export const Range = styled.div`
  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    margin: 1em 0;
    background: transparent;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 0;
    cursor: pointer;
    box-shadow: none;
    background: transparent;
    border-radius: 0;
    border: 1px dashed var(--border-color);
  }
  input[type='range']::-webkit-slider-thumb {
    box-shadow: none;
    border: 2px solid var(--border-color);
    height: 2em;
    width: 2em;
    border-radius: 0;
    background: var(--dialog-background);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -1em;
    position: relative;
  }
`
