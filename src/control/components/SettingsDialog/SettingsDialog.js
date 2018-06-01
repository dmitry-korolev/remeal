import { h, Component } from 'preact'
import { BlocksOrder } from './BlocksOrder'
import { Checkbox } from './Checkbox'
import { Dialog, DialogClose } from './Dialog'
import { Button } from './Button'
import { Range } from './Range'

export class SettingsDialog extends Component {
  handleThemeChange = (event) => {
    this.props.configApi.changeTheme(event.target.value)
  }

  handleResetClick = (event) => {
    event.preventDefault()
    this.props.configApi.resetConfig()
  }

  handleRatioChange = (event) => {
    event.preventDefault()
    this.props.configApi.changeRatio(+event.target.value)
  }

  render({
    blocks,
    dialogOpened,
    vibration,
    pointer,
    ratio,
    theme,
    configApi
  }) {
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
              <label htmlFor="pointerRatio">
                Pointer size (relative to screen height):
              </label>
              <Range>
                <input
                  onChange={this.handleRatioChange}
                  type="range"
                  value={ratio}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </Range>
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
