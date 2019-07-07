import { Request, Response } from 'express'
import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'
import { Store } from 'redux'
import Name from '../components/Name'
import { Chunks, ChunksWereSet } from '../types'
import { getChunks } from '../utils'

// type InitialProps = {
//   req: Request,
// }

type Props = {
  asPath: string
  isServer: boolean
  pathname: string
  query: any
  req: Request
  res: Response
  store: Store
}

const Index = () => (
  <>
    <Head>
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        name="viewport"
      />
      <title>N ER1 V AH0 S</title>
    </Head>
    <Name />
  </>
)
Index.getInitialProps = (props: Props): any => {
  const chunks: Chunks = getChunks()
  const chunksWereSet: ChunksWereSet = {
    payload: chunks,
    type: 'CHUNKS_WERE_SET',
  }
  props.store.dispatch(chunksWereSet)
  return {}
}

export default connect()(Index)
