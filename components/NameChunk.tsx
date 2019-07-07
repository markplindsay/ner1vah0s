import { DraggableCore, DraggableEventHandler } from 'react-draggable'
import React, { useRef } from 'react'
import { Chunk } from '../types'

type Props = {
  chunk?: Chunk
  handleDrag: (chunk: Chunk) => void
}

const NameChunk = (props: Props) => {
  const ref = useRef(null)
  // const [style, setStyle] = useState({
  //   color: 'transparent',
  //   transform: 'translate(0px, 0px)',
  // })

  // constructor() {
   //  super()
   //  this.state = {
   //    style: {
   //      transform: 'translate(0px, 0px)',
   //    },
   //    x: 0,
   //    y: 0,
   //  }
   //  this._getClassName = this._getClassName.bind(this)
   //  this._handleDrag = this._handleDrag.bind(this)
   //  this._setStyle = this._setStyle.bind(this)
   //  this.componentWillMount = this.componentWillMount.bind(this)
   //  this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
   //  this.render = this.render.bind(this)
  // }
  const handleDrag: DraggableEventHandler = (_event, ui) => {
    const el = ref.current
    if (el !== null && props.chunk !== undefined) {
      const draggedChunk: Chunk = {
        key: props.chunk.key,
        el,
        x: props.chunk.x,
        y: props.chunk.y,
        deltaX: ui.deltaX,
        deltaY: ui.deltaY,
      }
      props.handleDrag(draggedChunk)
    }
  }
  // _setStyle(props) {
   //  if (props.nameChunk === undefined) {
   //    return
   //  }
   //  const x = props.nameChunk.get('x')
   //  const y = props.nameChunk.get('y')
   //  this.setState({
   //    style: {
   //      color: props.nameChunk.get('color'),
   //      transform: `translate(${x}px, ${y}px)`,
   //    },
   //    x,
   //    y,
   //  })
  // }
  if (props.chunk === undefined) {
    return null
  }
  if (props.chunk.key === 'ah0') {
    console.log(props.chunk.x, props.chunk.y)
  }
  return (
    <DraggableCore onDrag={handleDrag}>
      <span className={`chunk chunk-${props.chunk.key}`} ref={ref}>
        {props.chunk.key.toUpperCase()}
        <style jsx>{`
          display: block;
          transition: opacity 250ms;
          position: absolute;
          cursor: default;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          cursor: move;
          cursor: grab;
          cursor: -moz-grab;
          cursor: -webkit-grab;
          color: ${props.chunk.color};
          transform: translate(${props.chunk.x}px, ${props.chunk.y}px);
          &:active {
            cursor: grabbing;
            cursor: -moz-grabbing;
            cursor: -webkit-grabbing;
          }
       `}</style> 
      </span>
    </DraggableCore>
  )
}

export default NameChunk
