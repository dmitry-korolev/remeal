import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { BlocksOrder } from './BlocksOrder'

const Dialog = styled.dialog`
  width: calc(100vw - 4em);
  left: 2em;
  top: 2em;
  margin: 0;
  border-color: var(--border-color);
  background-color: var(--dialog-background);
  color: var(--font-color);
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.75);
  z-index: 999;

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

const DialogClose = styled.span`
  position: absolute;
  top: 1em;
  right: 1em;
`

const Checkbox = styled.div`
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

const Button = styled.button`
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

export class SettingsDialog extends Component {
  handleThemeChange = (event) => {
    this.props.configApi.changeTheme(event.target.value)
  }

  handleResetClick = (event) => {
    event.preventDefault()
    this.props.configApi.resetConfig()
  }

  render({ blocks, dialogOpened, vibration, pointer, theme, configApi }) {
    return (
      <div>
        <div onClick={configApi.toggleDialog}>
          <i className="mi">settings</i>
        </div>
        <Dialog open={dialogOpened}>
          <DialogClose onClick={configApi.toggleDialog}>
            <i className="mi">close</i>
          </DialogClose>
          <h3>Config</h3>

          <form id="form">
            <p>
              <label htmlFor="theme">Theme:</label>{' '}
              <select
                id="theme"
                name="theme"
                onChange={this.handleThemeChange}
                tabIndex={1}>
                <option value="dark" selected={theme === 'dark'}>
                  Dark
                </option>
                <option value="light" selected={theme === 'light'}>
                  Light
                </option>
              </select>
            </p>

            <p>
              <Checkbox>
                <input
                  type="checkbox"
                  id="vibration"
                  checked={vibration}
                  onChange={configApi.toggleVibration}
                  tabIndex={2}
                />
                <label htmlFor="vibration">Vibrations:</label>{' '}
              </Checkbox>
            </p>

            <p>
              <Checkbox>
                <input
                  type="checkbox"
                  id="pointer"
                  checked={pointer}
                  onChange={configApi.togglePointer}
                  tabIndex={3}
                />
                <label htmlFor="pointer">Pointer:</label>{' '}
              </Checkbox>
            </p>

            <p>
              Order:<br />
              <BlocksOrder
                blocks={blocks}
                onBlockChange={configApi.changeBlock}
              />
            </p>

            <p>
              <Button onClick={this.handleResetClick} tabIndex={4}>
                Reset
              </Button>
            </p>
          </form>
        </Dialog>
      </div>
    )
  }
}
