import C from '../constants'
import Immutable from 'immutable'

const initialState = Immutable.Map({
  adjustment: 1,
  nameChunks: Immutable.Map(),
  nameEl: null,
  xOffset: 256
})

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case C.NAME_CHUNK_DRAGGED:
    case C.NAME_CHUNK_MOVED:
      let payload = action.payload
      if (Immutable.Map.isMap(payload)) {
        payload = payload.toJS()
      }
      return state.mergeIn(
        ['nameChunks', payload.key], 
        Immutable.Map({
          color: payload.color,
          x: payload.x,
          y: payload.y
        })
      )

    case C.NAME_CHUNKS_SET:
      return state.set('nameChunks', 
                       Immutable.fromJS(action.payload.nameChunks))

    case C.NAME_EL_SET:
      return state.merge({
        nameEl: action.payload.get('el')
      })

    case C.WINDOW_RESIZED:
      return state.merge({
        adjustment: action.payload.get('adjustment'),
        xOffset: action.payload.get('xOffset')
      })

    default:
      return state
  }
}
