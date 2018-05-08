import { h, Component } from 'preact'
import styled from 'preact-emotion'

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
  right: 2em;
`

export class SettingsDialog extends Component {
  handleThemeChange = (event) => {
    this.props.onThemeChange(event.target.value)
  }

  handleBlockChange = (event) => {
    this.props.onBlockChange(event.target.name, event.target.value)
  }

  renderBlock(blockId) {
    const block = this.props.blocks[blockId]

    return (
      <select name={blockId} onChange={this.handleBlockChange}>
        <option value="disabled" selected={block === 'disabled'}>
          Disabled
        </option>
        <option value="presentation" selected={block === 'presentation'}>
          Presentation frame
        </option>
        <option value="notes" selected={block === 'notes'}>
          Speaker notes
        </option>
        <option value="controls" selected={block === 'controls'}>
          Controls
        </option>
      </select>
    )
  }

  render({ dialogOpened, theme, onOpenClick, onCloseClick }) {
    return (
      <div>
        <Button onClick={onOpenClick}>
          <i className="mi">settings</i>
        </Button>
        <Dialog open={dialogOpened}>
          <DialogClose onClick={onCloseClick}>
            <i className="mi">close</i>
          </DialogClose>
          <h3 bind>Config</h3>

          <form id="form">
            <p>
              Theme:{' '}
              <select name="theme" onChange={this.handleThemeChange}>
                <option value="dark" selected={theme === 'dark'}>
                  Dark
                </option>
                <option value="light" selected={theme === 'light'}>
                  Light
                </option>
              </select>
            </p>

            <p>Block A: {this.renderBlock('blockA')}</p>

            <p>Block B: {this.renderBlock('blockB')}</p>

            <p>Block C: {this.renderBlock('blockC')}</p>
          </form>
        </Dialog>
      </div>
    )
  }
}
