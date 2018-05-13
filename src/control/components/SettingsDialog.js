import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { BlocksOrder } from './BlocksOrder'

const Button = styled.div``

const Dialog = styled.dialog`
  width: calc(100vw - 4em);
  left: 2em;
  top: 2em;
  margin: 0;
  border-radius: 0.3em;
  border-color: var(--border-color);
  background-color: rgba(0, 0, 0, 0.9);
  color: #caced1;
  box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.75);
  z-index: 999;

  select {
    background-color: #caced1;
  }
`

const DialogClose = styled.span`
  position: absolute;
  top: 1em;
  right: 1em;
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
        <Button onClick={configApi.toggleDialog}>
          <i className="mi">settings</i>
        </Button>
        <Dialog open={dialogOpened}>
          <DialogClose onClick={configApi.toggleDialog}>
            <i className="mi">close</i>
          </DialogClose>
          <h3 bind>Config</h3>

          <form id="form">
            <p>
              <label htmlFor="theme">Theme:</label>{' '}
              <select id="theme" name="theme" onChange={this.handleThemeChange}>
                <option value="dark" selected={theme === 'dark'}>
                  Dark
                </option>
                <option value="light" selected={theme === 'light'}>
                  Light
                </option>
              </select>
            </p>

            <p>
              <label htmlFor="vibration">Vibrations:</label>{' '}
              <input
                type="checkbox"
                id="vibration"
                checked={vibration}
                onChange={configApi.toggleVibration}
              />
            </p>

            <p>
              <label htmlFor="pointer">Pointer:</label>{' '}
              <input
                type="checkbox"
                id="pointer"
                checked={pointer}
                onChange={configApi.togglePointer}
              />
            </p>

            <p>
              Order:<br />
              <BlocksOrder
                blocks={blocks}
                onBlockChange={configApi.changeBlock}
              />
            </p>

            <p>
              <button onClick={this.handleResetClick}>Reset</button>
            </p>
          </form>
        </Dialog>
      </div>
    )
  }
}
