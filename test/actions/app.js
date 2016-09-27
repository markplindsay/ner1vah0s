import appActions from '../../src/actions/app'
import C from '../../src/constants'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import jsdom from 'mocha-jsdom'
import thunk from 'redux-thunk'

chai.use(chaiImmutable)

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions/app', () => {

  jsdom()

  before(function () {
    global.config = {
      NER1VAH0S_ACTION_KEY: 'hello'
    }
  })

  it('should create an action for handleNameChunkDrag', () => {
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
    chai.assert.equal(actions[0].key, 'hello')
    chai.assert.equal(actions[0].type, C.NAME_CHUNK_DRAGGED)
    chai.assert.lengthOf(actions[0].payload.get('color'), 7)
    chai.assert.equal(actions[0].payload.get('key'), 'n')
    chai.assert.equal(actions[0].payload.get('x'), 0)
    chai.assert.equal(actions[0].payload.get('y'), 0)
  })
  
  it('should create an action for setNameEl', () => {
    const el = { fakeHtmlElementObject: 'something' }
    const expected = {
      type: C.NAME_EL_SET,
      payload: Immutable.Map({
        el: el
      })
    }
    // We need to use deepEqual here due to the Immutable.Map.
    chai.assert.deepEqual(appActions.setNameEl(el), expected)
  })

  it('should create an action for setWindowSize', () => {
    const expected = {
      type: C.WINDOW_RESIZED,
      payload: Immutable.Map({
        adjustment: 0.48828125,
        xOffset: 0
      })
    }
    chai.assert.deepEqual(appActions.setWindowSize(667, 375), expected)
  })
})
