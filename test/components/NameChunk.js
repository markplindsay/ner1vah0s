import chai from 'chai'
import { DraggableCore } from 'react-draggable'
import Immutable from 'immutable'
import jsdom from 'mocha-jsdom'
import NameChunk from '../../src/components/NameChunk'
import React from 'react'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('components/NameChunk', () => {
  
  jsdom()

  it('should render correctly', () => {
    let props = {
      handleDrag: sinon.spy(),
      nameChunk: Immutable.Map({
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 123
      })
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<NameChunk {...props} />)
    const output = renderer.getRenderOutput()
    chai.assert.equal(output.type, DraggableCore)
    chai.assert.equal(output.props.children.props.className, 
                      'name-chunk name-chunk-n')
    chai.assert.equal(output.props.children.props.children, 'N')
    chai.assert.deepEqual(output.props.children.props.style, {
      color: '#FF0000',
      transform: 'translate(0px, 123px)'
    })
  })

  it('should not render when nameChunk is undefined', () => {
    let props = {
      handleDrag: sinon.spy(),
      nameChunk: undefined
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<NameChunk {...props} />)
    const output = renderer.getRenderOutput()
    chai.assert.isNull(output)
  })

  it('should set its internal state on mount and again on new props', () => {
    const props = {
      handleDrag: sinon.spy(),
      nameChunk: Immutable.Map({
        color: '#FF0000',
        key: 'n',
        x: 0,
        y: 123
      })
    }
    const output = TestUtils.renderIntoDocument(<NameChunk {...props} />)
    chai.assert.deepEqual(output.state, {
      style: {
        color: '#FF0000',
        transform: 'translate(0px, 123px)'
      },
      x: 0,
      y: 123
    })
    const newProps = {
      handleDrag: sinon.spy(),
      nameChunk: Immutable.Map({
        color: '#000000',
        key: 'n',
        x: 5,
        y: 123
      })
    }
    const newOutput = TestUtils.renderIntoDocument(
                      <NameChunk {...newProps} />)
    chai.assert.deepEqual(newOutput.state, {
      style: {
        color: '#000000',
        transform: 'translate(5px, 123px)'
      },
      x: 5,
      y: 123
    })
  })

  it('should call props.handleDrag on drag', () => {
    const props = {
      handleDrag: sinon.spy(),
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
    chai.assert.isTrue(props.handleDrag.calledOnce)
  })
})
