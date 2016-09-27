import chai from 'chai'
import Immutable from 'immutable'
import jsdom from 'mocha-jsdom'
import Name from '../../src/components/Name'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('components/Name', () => {
  
  jsdom()

  it('should render correctly', () => {
    let props = {
      adjustment: 1,
      handleNameChunkDrag: sinon.spy(),
      nameChunks: Immutable.Map(),
      setNameEl: sinon.spy(),
      xOffset: 256
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<Name {...props} />)
    const output = renderer.getRenderOutput()
    chai.assert.equal(output.type, 'div')
    chai.assert.equal(output.props.className, 'name')
    chai.assert.equal(output.props.style.transform, 'scale(1)')
    chai.assert.equal(output.props.style.transformOrigin, '256px 0')
    chai.assert.lengthOf(output.props.children, 5)
  })

  it('should render correctly when there has been a scale adjustment', () => {
    let props = {
      adjustment: 0.48828125,
      handleNameChunkDrag: sinon.spy(),
      nameChunks: Immutable.Map(),
      setNameEl: sinon.spy(),
      xOffset: 0
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<Name {...props} />)
    const output = renderer.getRenderOutput()
    chai.assert.equal(output.props.style.transform, 'scale(0.48828125)')
    chai.assert.equal(output.props.style.transformOrigin, '0px 0')
  })

  it('should call props.setNameEl once on mount', () => {
    let props = {
      adjustment: 1,
      handleNameChunkDrag: sinon.spy(),
      nameChunks: Immutable.Map(),
      setNameEl: sinon.spy(),
      xOffset: 256
    }
    TestUtils.renderIntoDocument(<Name {...props} />)
    chai.assert.isTrue(props.setNameEl.calledOnce)
  })
})
