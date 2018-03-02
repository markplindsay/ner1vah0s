import appActions from '../../src/actions/app'
import C from '../../src/constants'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions/app', () => {

  beforeAll(function () {
    global.config = {
      NER1VAH0S_ACTION_KEY: 'hello'
    }
  })

  test('should create an action for handleNameChunkDrag', () => {
    const nameEl = document.createElement('div')
    const store = mockStore(Immutable.Map({
      app: Immutable.Map({
        adjustment: 1,
        nameEl: nameEl
      })
    }))
    const spanEl = document.createElement('span')
    store.dispatch(appActions.handleNameChunkDrag({
      key: 'n', 
      el: spanEl, 
      x: 0, 
      y: 123, 
      deltaX: 5, 
      deltaY: 128
    }))
    const actions = store.getActions()
    expect(actions[0].key).toEqual('hello')
    expect(actions[0].type).toEqual(C.NAME_CHUNK_DRAGGED)
    expect(actions[0].payload.get('color').length).toBe(7)
    expect(actions[0].payload.get('key')).toEqual('n')
    expect(actions[0].payload.get('x')).toEqual(0)
    expect(actions[0].payload.get('y')).toEqual(0)
  })
  
  test('should create an action for setNameEl', () => {
    const el = { fakeHtmlElementObject: 'something' }
    const expected = {
      type: C.NAME_EL_SET,
      payload: Immutable.Map({
        el: el
      })
    }
    // We need to use deepEqual here due to the Immutable.Map.
    expect(appActions.setNameEl(el)).toEqual(expected)
  })

  test('should create an action for setWindowSize', () => {
    const expected = {
      type: C.WINDOW_RESIZED,
      payload: Immutable.Map({
        adjustment: 0.48828125,
        xOffset: 0
      })
    }
    expect(appActions.setWindowSize(667, 375)).toEqual(expected)
  })
})
