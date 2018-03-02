import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import Immutable from 'immutable'
import Name from '../../src/components/Name'
import React from 'react'
import TestUtils from 'react-dom/test-utils'

Enzyme.configure({ adapter: new Adapter() })

describe('components/Name', () => {

  test('should render correctly', () => {
    let props = {
      adjustment: 1,
      handleNameChunkDrag: jest.fn(),
      nameChunks: Immutable.Map(),
      setNameEl: jest.fn(),
      xOffset: 256
    }
    const wrapper = Enzyme.shallow(<Name {...props} />, {
      disableLifecycleMethods: true
    })
    expect(wrapper.type()).toEqual('div')
    expect(wrapper.props().className).toEqual('name')
    expect(wrapper.props().style.transform).toEqual('scale(1)')
    expect(wrapper.props().style.transformOrigin).toEqual('256px 0')
    expect(wrapper.props().children.length).toBe(5)
  })

  test('should render correctly when there has been a scale adjustment', () => {
    let props = {
      adjustment: 0.48828125,
      handleNameChunkDrag: jest.fn(),
      nameChunks: Immutable.Map(),
      setNameEl: jest.fn(),
      xOffset: 0
    }
    const wrapper = Enzyme.shallow(<Name {...props} />, {
      disableLifecycleMethods: true
    })
    expect(wrapper.props().style.transform).toEqual('scale(0.48828125)')
    expect(wrapper.props().style.transformOrigin).toEqual('0px 0')
  })

  test('should call props.setNameEl once on mount', () => {
    const setNameEl = jest.fn()
    let props = {
      adjustment: 1,
      handleNameChunkDrag: jest.fn(),
      nameChunks: Immutable.Map(),
      setNameEl: setNameEl,
      xOffset: 256
    }
    TestUtils.renderIntoDocument(<Name {...props} />)
    expect(setNameEl.mock.calls.length).toBe(1)
  })
})
