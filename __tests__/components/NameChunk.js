import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import { DraggableCore } from 'react-draggable'
import Immutable from 'immutable'
import NameChunk from '../../src/components/NameChunk'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

Enzyme.configure({ adapter: new Adapter() })

describe('components/NameChunk', () => {
  
  test('should render correctly', () => {
    let props = {
      handleDrag: jest.fn(),
      nameChunk: Immutable.Map({
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 123
      })
    }
    const wrapper = Enzyme.shallow(<NameChunk {...props} />)
    expect(wrapper.type()).toEqual(DraggableCore)
    expect(wrapper.find('.name-chunk.name-chunk-n').length).toEqual(1)
    expect(wrapper.find('.name-chunk.name-chunk-n').text()).toEqual('N')
    expect(wrapper.find('.name-chunk.name-chunk-n').props().style).toEqual({
      color: '#FF0000',
      transform: 'translate(0px, 123px)'
    })
  })

  test('should set its internal state on mount and again on new props', () => {
    const props = {
      handleDrag: jest.fn(),
      nameChunk: Immutable.Map({
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 123
      })
    }
    const wrapper = Enzyme.shallow(<NameChunk {...props} />)
    expect(wrapper.state()).toEqual({
      style: {
        color: '#FF0000',
        transform: 'translate(0px, 123px)'
      },
      x: 0,
      y: 123
    })
    const newProps = {
      handleDrag: jest.fn(),
      nameChunk: Immutable.Map({
        color: '#000000',
        key: 'n',
        x: 5,
        y: 123
      })
    }
    const newWrapper = Enzyme.shallow(<NameChunk {...newProps} />)
    expect(newWrapper.state()).toEqual({
      style: {
        color: '#000000',
        transform: 'translate(5px, 123px)'
      },
      x: 5,
      y: 123
    })
  })

  test('should call props.handleDrag on drag', () => {
    const handleDrag = jest.fn()
    const props = {
      handleDrag: handleDrag,
      nameChunk: Immutable.Map({
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 0
      })
    }
    let output = TestUtils.renderIntoDocument(<NameChunk {...props} />)
    let node = ReactDOM.findDOMNode(output)
    TestUtils.Simulate.mouseDown(node, { clientX: 334, clientY: 242 })
    let e = document.createEvent('MouseEvents')
    e.initMouseEvent('mousemove', true, true, window, 0, 0, 0, 334, 243, 
                     false, false, false, false, 0, null)
    document.dispatchEvent(e)
    TestUtils.Simulate.mouseUp(node)
    expect(handleDrag.mock.calls.length).toBe(1)
  })
})
