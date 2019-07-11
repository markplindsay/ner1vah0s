import { DraggableCore, DraggableEventHandler } from 'react-draggable'
import React, { useRef, useState } from 'react'
import { Chunk, DraggedChunk } from '../types'

type Props = {
  chunk?: Chunk
  onDrag: (draggedChunk: DraggedChunk) => void
}

const NameChunk = (props: Props) => {
  const [isDragging, setIsDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const handleDrag: DraggableEventHandler = (_event, ui) => {
    const el = ref.current
    if (el !== null && props.chunk !== undefined) {
      const bcr = el.getBoundingClientRect()
      const draggedChunk: DraggedChunk = {
        key: props.chunk.key,
        bcr,
        x: props.chunk.x,
        y: props.chunk.y,
        deltaX: ui.deltaX,
        deltaY: ui.deltaY,
      }
      props.onDrag(draggedChunk)
    }
  }
  if (props.chunk === undefined) {
    return null
  }
  let cursor = 'grab'
  if (isDragging) {
    cursor = 'grabbing'
  }
  const handleStart: DraggableEventHandler = () => {
    setIsDragging(true)
  }
  const handleStop: DraggableEventHandler = () => {
    setIsDragging(false)
  }
  return (
    <DraggableCore
      onDrag={handleDrag}
      onStart={handleStart}
      onStop={handleStop}
    >
      <span className={`chunk chunk-${props.chunk.key}`} ref={ref}>
        {props.chunk.key.toUpperCase()}
        <style jsx>{`
          display: block;
          position: absolute;
          cursor: default;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          cursor: move;
          cursor: ${cursor};
          cursor: -moz-${cursor};
          cursor: -webkit-${cursor};
          color: ${props.chunk.color};
          transform: translate(${props.chunk.x}px, ${props.chunk.y}px);
       `}</style> 
      </span>
    </DraggableCore>
  )
}

export default NameChunk
