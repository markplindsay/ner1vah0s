import actions from './actions'
import App from './containers/App'
import { applyMiddleware, createStore } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducers'
import thunk from 'redux-thunk'

let url = '/'
if (config.NER1VAH0S_URL !== undefined) {
  url = config.NER1VAH0S_URL
}

const socket = io.connect(url)
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

const store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mount'),
)

document.ontouchmove = (event) => {
  event.preventDefault()
}

window.addEventListener('resize', () => {
  store.dispatch(actions.setWindowSize(window.innerHeight, window.innerWidth))
})
window.dispatchEvent(new Event('resize'))
