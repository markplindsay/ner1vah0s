import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import actions from './actions'
import reducer from './reducers'
import App from './containers/App'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'

let url = '/'
if (config.NER1VAH0S_URL !== undefined) {
  url = config.NER1VAH0S_URL
}

let socket = io.connect(url)
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

let store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mount')
)

document.ontouchmove = (event) => {
  event.preventDefault()
}

window.addEventListener('resize', () => {
  store.dispatch(actions.setWindowSize(window.innerHeight, window.innerWidth))
})
window.dispatchEvent(new Event('resize'))
