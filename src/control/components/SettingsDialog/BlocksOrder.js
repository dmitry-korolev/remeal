import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { createSelector, createStructuredSelector } from 'reselect'
import { throttle } from '../../../helpers/throttle'

const DragContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const DropArea = styled.div`
  height: calc(9em + 2px);
  width: calc(50% - 0.2em + 2px);
  border: 1px dashed var(--border-color);
`

const DeleteArea = styled(DropArea)`
  position: relative;

  ::after {
    content: 'delete';
    font-weight: bold;
    font-size: 3em;
    font-family: 'Material Icons';
    opacity: 0.3;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: -1;
  }
`

const DraggableItem = styled.div`
  height: 3em;
  line-height: calc(3em - 2px);
  text-align: center;
  border: 1px solid var(--border-color);
`

const swap = (arr, a, b) => {
  const newArr = arr.slice()
  const indexA = arr.indexOf(a)
  const indexB = arr.indexOf(b)

  newArr[indexA] = b
  newArr[indexB] = a

  return newArr
}

const sortedBlocksSelector = createSelector(
  (blocks) => blocks,
  (blocks) =>
    Object.entries(blocks)
      .map(([blockName, blockOrder]) => ({ blockName, blockOrder }))
      .sort((a, b) => a.blockOrder - b.blockOrder)
)

const enabledBlocksSelector = createSelector(sortedBlocksSelector, (blocks) =>
  blocks
    .filter(({ blockOrder }) => blockOrder >= 0)
    .map(({ blockName }) => blockName)
)

const disabledBlocksSelector = createSelector(sortedBlocksSelector, (blocks) =>
  blocks
    .filter(({ blockOrder }) => blockOrder < 0)
    .map(({ blockName }) => blockName)
)

const blocksSelector = createStructuredSelector({
  enabled: enabledBlocksSelector,
  disabled: disabledBlocksSelector
})

const getElType = (id) => (id < 0 ? 'disabled' : 'enabled')

const processElements = (elements, type) =>
  elements.reduce((result, item, index) => {
    result[item] = type === 'enabled' ? index : index - elements.length
    return result
  }, {})

export class BlocksOrder extends Component {
  handleDragStart = (event) => {
    this.draggedId = event.target.id
    this.draggedType = getElType(this.props.blocks[event.target.id])
  }

  handleDragEnter = (event) => {
    event.preventDefault()
  }

  handleDrag = throttle(100, (event) => {
    event.preventDefault()
    const targetId = event.target.id

    const draggedId = this.draggedId
    const draggedType = this.draggedType
    const { blocks } = this.props
    const types = blocksSelector(blocks)
    const targetType =
      targetId in blocks ? getElType(blocks[targetId]) : targetId

    // Ignore if dragged element is a target
    if (draggedId === targetId) {
      return
    }

    // Ignore if dragged element lands on an empty space of same type
    if (draggedType === targetId) {
      return
    }

    // Swap elements if they are of same type
    if (draggedType === targetType) {
      types[targetType] = swap(types[targetType], draggedId, targetId)
    }

    // If dragged element lands on an empty space of different type
    // remove it from oid type and add to the new type
    if (draggedType !== targetType) {
      this.draggedType = targetType
      types[draggedType] = types[draggedType].filter((id) => id !== draggedId)
      types[targetType] = types[targetType].concat(draggedId)
    }

    // Swap elements if the dragged element was dropped on the element
    if (draggedType !== targetType && targetType !== targetId) {
      types[targetType] = swap(types[targetType], draggedId, targetId)
    }

    this.props.onBlockChange(
      Object.assign(
        {},
        processElements(types[draggedType], draggedType),
        processElements(types[targetType], targetType)
      )
    )
  })

  render({ blocks }) {
    const { enabled, disabled } = blocksSelector(this.props.blocks)

    return (
      <DragContainer>
        <DropArea
          id="enabled"
          onDragStart={this.handleDragStart}
          onDragOver={this.handleDrag}
          onDragEnter={this.handleDragEnter}>
          {enabled.map((blockName) => (
            <DraggableItem draggable={true} key={blockName} id={blockName}>
              {blockName}
            </DraggableItem>
          ))}
        </DropArea>
        <DeleteArea
          id="disabled"
          onDragStart={this.handleDragStart}
          onDragOver={this.handleDrag}
          onDragEnter={this.handleDragEnter}>
          {disabled.map((blockName) => (
            <DraggableItem draggable={true} key={blockName} id={blockName}>
              {blockName}
            </DraggableItem>
          ))}
        </DeleteArea>
      </DragContainer>
    )
  }
}
