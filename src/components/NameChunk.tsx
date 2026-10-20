import { useRef, useState } from 'react'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import type { Chunk } from 'src/server'
import type { DraggedChunk } from './Name'

export default function NameChunk({
  chunk,
  onDrag,
}: {
  chunk?: Chunk
  onDrag: (draggedChunk: DraggedChunk) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const handleDrag: DraggableEventHandler = (_event, ui) => {
    const el = ref.current
    if (el !== null && chunk !== undefined) {
      const bcr = el.getBoundingClientRect()
      const draggedChunk: DraggedChunk = {
        key: chunk.key,
        bcr,
        x: chunk.x,
        y: chunk.y,
        deltaX: ui.deltaX,
        deltaY: ui.deltaY,
      }
      onDrag(draggedChunk)
    }
  }
  if (chunk === undefined) {
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
    <Draggable
      bounds="parent"
      nodeRef={ref}
      onDrag={handleDrag}
      onStart={handleStart}
      onStop={handleStop}
      position={{ x: chunk.x, y: chunk.y }}
    >
      <div
        className={`chunk chunk-${chunk.key}`}
        ref={ref}
        style={{
          color: chunk.color,
          cursor,
          display: 'block',
          position: 'absolute',
          userSelect: 'none',
        }}
      >
        {chunk.key.toUpperCase()}
      </div>
    </Draggable>
  )
}
