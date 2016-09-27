import appReducer from '../../src/reducers/app'
import C from '../../src/constants'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import Immutable from 'immutable'
import jsdom from 'mocha-jsdom'

chai.use(chaiImmutable)

const STATE_1 = Immutable.Map({
  adjustment: 1,
  nameChunks: Immutable.Map(),
  nameEl: null,
  xOffset: 256
})

const STATE_2 = Immutable.Map({
  adjustment: 1,
  nameChunks: Immutable.Map({
    n: Immutable.Map({
      color: '#000000',
      x: 0,
      y: 0
    }),
    er1: Immutable.Map({
      color: '#000000',
      x: 110,
      y: 0
    }),
    v: Immutable.Map({
      color: '#000000',
      x: 348,
      y: 0
    }),
    ah0: Immutable.Map({
      color: '#000000',
      x: 446,
      y: 0
    }),
    s: Immutable.Map({
      color: '#000000',
      x: 690,
      y: 0
    })
  }),
  nameEl: null,
  xOffset: 256
})

describe('reducers/app', () => {

  jsdom()

  it('returns the initial state with undefined state and no action', () => {
    const state = undefined
    const action = {}
    const expected = STATE_1
    chai.assert.equal(appReducer(state, action), expected)
  })

  it('returns the passed-in state with no action', () => {
    const state = STATE_2
    const action = {}
    const expected = state
    chai.assert.equal(appReducer(state, action), expected)
  })

  it(C.NAME_CHUNK_DRAGGED, () => {
    const state = STATE_2
    const action = {
      payload: Immutable.Map({
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 123
      }),
      type: C.NAME_CHUNK_DRAGGED
    }
    const expected = state.setIn(['nameChunks', 'n'], Immutable.Map({
      color: '#FF0000',
      x: 0,
      y: 123
    }))
    chai.assert.equal(appReducer(state, action), expected)
  })

  it(C.NAME_CHUNK_MOVED, () => {
    const state = STATE_2
    const action = {
      payload: {
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 123
      },
      type: C.NAME_CHUNK_MOVED
    }
    const expected = state.setIn(['nameChunks', 'n'], Immutable.Map({
      color: '#FF0000',
      x: 0,
      y: 123
    }))
    chai.assert.equal(appReducer(state, action), expected)
  })

  it(C.NAME_CHUNKS_SET, () => {
    const state = STATE_1
    const action = {
      payload: {
        nameChunks: {
          n: {
            color: '#000000',
            x: 0,
            y: 0
          },
          er1: {
            color: '#000000',
            x: 110,
            y: 0
          },
          v: {
            color: '#000000',
            x: 348,
            y: 0
          },
          ah0: {
            color: '#000000',
            x: 446,
            y: 0
          },
          s: {
            color: '#000000',
            x: 690,
            y: 0
          }
        }
      },
      type: C.NAME_CHUNKS_SET
    }
    const expected = STATE_2
    chai.assert.equal(appReducer(state, action), expected)
  })

  it(C.NAME_EL_SET, () => {
    const state = STATE_1
    const divEl = document.createElement('div')
    const action = {
      payload: Immutable.Map({
        el: divEl
      }),
      type: C.NAME_EL_SET
    }
    const expected = state.set('nameEl', divEl)
    chai.assert.equal(appReducer(state, action), expected)
  })

  it(C.WINDOW_RESIZED, () => {
    const state = STATE_1
    const action = {
      payload: Immutable.Map({
        adjustment: 0.48828125,
        xOffset: 0
      }),
      type: C.WINDOW_RESIZED
    }
    const expected = state.merge({
      adjustment: 0.48828125,
      xOffset: 0
    })
    chai.assert.equal(appReducer(state, action), expected)
  })
})
