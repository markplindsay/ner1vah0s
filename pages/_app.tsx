import App, { AppProps, Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import withRedux from 'next-redux-wrapper'
import { makeStore } from '../store'

interface Props extends AppProps {
  store: Store
}

class Ner1vah0sApp extends App<Props> {
  render () {
    return (
      <Container>
        <Provider store={this.props.store}>
          <this.props.Component {...this.props.pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(makeStore)(Ner1vah0sApp)
