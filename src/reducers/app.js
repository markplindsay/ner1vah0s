import C from '../constants'
import Immutable from 'immutable'

const initialState = Immutable.Map({
  adjustment: 1,
  nameChunks: Immutable.Map(),
  nameEl: null,
  xOffset: 256,
})

function nameChunkDraggedOrMoved(state, action) {
  let { payload } = action
  if (Immutable.Map.isMap(payload)) {
    payload = payload.toJS()
  }
  return state.mergeIn(
    ['nameChunks', payload.key],
    Immutable.Map({
      color: payload.color,
      x: payload.x,
      y: payload.y,
    }),
  )
}

function nameChunksSet(state, action) {
  return state.set('nameChunks', Immutable.fromJS(action.payload.nameChunks))
}

function nameElSet(state, action) {
  return state.merge({
    nameEl: action.payload.get('el'),
  })
}

function windowResized(state, action) {
  return state.merge({
    adjustment: action.payload.get('adjustment'),
    xOffset: action.payload.get('xOffset'),
  })
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case C.NAME_CHUNK_DRAGGED:
    case C.NAME_CHUNK_MOVED:
      return nameChunkDraggedOrMoved(state, action)

    case C.NAME_CHUNKS_SET:
      return nameChunksSet(state, action)

    case C.NAME_EL_SET:
      return nameElSet(state, action)

    case C.WINDOW_RESIZED:
      return windowResized(state, action)

    default:
      return state
  }
}
