import actions from '../actions'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import Name from '../components/Name'
import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.render = this.render.bind(this)
  }
  render() {
    return (
      <div>
        <Name adjustment={this.props.adjustment}
              handleNameChunkDrag={this.props.handleNameChunkDrag}
              nameChunks={this.props.nameChunks} 
              setNameEl={this.props.setNameEl} 
              xOffset={this.props.xOffset} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    adjustment: state.getIn(['app', 'adjustment']),
    nameChunks: state.getIn(['app', 'nameChunks']),
    xOffset: state.getIn(['app', 'xOffset'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleNameChunkDrag: bindActionCreators(actions.handleNameChunkDrag, 
                                            dispatch),
    setNameEl: bindActionCreators(actions.setNameEl, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
