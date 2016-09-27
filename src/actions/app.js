import C from '../constants'
import getBoundX from '../utils/getBoundX'
import getBoundY from '../utils/getBoundY'
import getRandomColor from '../utils/getRandomColor'
import Immutable from 'immutable'

export default {
  handleNameChunkDrag: (draggedNameChunk) => {
    return (dispatch, getState) => {
      const adjustment = getState().getIn(['app', 'adjustment'])
      const chunkBcr = draggedNameChunk.el.getBoundingClientRect()
      const nameBcr = getState().getIn(['app', 'nameEl'])
                      .getBoundingClientRect()
      dispatch({
        key: config.NER1VAH0S_ACTION_KEY,
        payload: Immutable.Map({
          color: getRandomColor(),
          key: draggedNameChunk.key,
          x: getBoundX(draggedNameChunk.x, draggedNameChunk.deltaX, chunkBcr, 
                       nameBcr, adjustment),
          y: getBoundY(draggedNameChunk.y, draggedNameChunk.deltaY, chunkBcr, 
                       nameBcr, adjustment)
        }),
        type: C.NAME_CHUNK_DRAGGED,
      })
    }
  },
  setNameEl: (el) => {
    return {
      type: C.NAME_EL_SET,
      payload: Immutable.Map({
        el: el
      })
    }
  },
  setWindowSize: (h, w) => {
    const height = Math.min(C.BASE_LENGTH, h)
    const width = Math.min(C.BASE_LENGTH, w)
    const length = Math.min(height, width)
    const adjustment = length / C.BASE_LENGTH
    const xOffset = w - length
    return {
      type: C.WINDOW_RESIZED,
      payload: Immutable.Map({
        adjustment: adjustment,
        xOffset: xOffset
      })
    }
  }
}
