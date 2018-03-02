import actions from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Name from '../components/Name'
import PropTypes from 'prop-types'
import React from 'react'

function App(props) {
  return (
    <div>
      <Name
        adjustment={props.adjustment}
        handleNameChunkDrag={props.handleNameChunkDrag}
        nameChunks={props.nameChunks}
        setNameEl={props.setNameEl}
        xOffset={props.xOffset}
      />
    </div>
  )
}
App.defaultProps = {
  nameChunks: Immutable.Map(),
}
App.propTypes = {
  adjustment: PropTypes.number.isRequired,
  handleNameChunkDrag: PropTypes.func.isRequired,
  nameChunks: ImmutablePropTypes.mapOf(ImmutablePropTypes.contains({
    color: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })),
  setNameEl: PropTypes.func.isRequired,
  xOffset: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    adjustment: state.getIn(['app', 'adjustment']),
    nameChunks: state.getIn(['app', 'nameChunks']),
    xOffset: state.getIn(['app', 'xOffset']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNameChunkDrag: bindActionCreators(
      actions.handleNameChunkDrag,
      dispatch,
    ),
    setNameEl: bindActionCreators(actions.setNameEl, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
