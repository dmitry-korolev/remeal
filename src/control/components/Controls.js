import { h } from 'preact'
import styled from 'preact-emotion'
;`

.button.prev, .button.pause, .button.overview {
    --height: calc(var(--buttons-height) / 3);
    height: var(--height);
    line-height: var(--height);
}

.button.next {
    height: var(--buttons-height);
    line-height: var(--buttons-height);
}

`

const Container = styled.div`
  display: flex;
  align-content: stretch;
  align-items: stretch;
`

const Button = styled.div`
  text-align: center;
  border-top: ${(props) =>
    props.borderTop ? '2px solid var(--border-color)' : 'none'};
  font-size: 5vh;
`

const Column = styled.div`
  width: ${(props) => props.width};
  border-right: ${(props) =>
    props.mode === 'left' ? '2px solid var(--border-color)' : 'none'};

  > ${Button} {
    --height: calc(100% / ${(props) => props.children.length});
    height: var(--height);

    i {
      display: inline-block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

export const Controls = ({
  onPrevClick,
  onNextClick,
  onOverviewClick,
  onPauseClick,
  paused
}) => (
  <Container>
    <Column width="30%" mode="left">
      <Button onClick={onPrevClick}>
        <i className="mi">navigate_before</i>
      </Button>
      <Button borderTop={true} onClick={onPauseClick}>
        {paused ? (
          <i className="mi">play_arrow</i>
        ) : (
          <i className="mi">pause</i>
        )}
      </Button>
      <Button borderTop={true} onClick={onOverviewClick}>
        <i className="mi">view_module</i>
      </Button>
    </Column>
    <Column width="70%" mode="right">
      <Button onCLick={onNextClick}>
        <i className="mi">navigate_next</i>
      </Button>
    </Column>
  </Container>
)
