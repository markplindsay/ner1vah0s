// import { NextContext } from 'next'
import Head from 'next/head'
import React from 'react'
import Name from '../components/Name'
import { Chunks } from '../types'

type Props = {
  chunks: Chunks
}

const Index = (props: Props) => (
  <>
    <Head>
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        name="viewport"
      />
      <title>N ER1 V AH0 S</title>
    </Head>
    <Name chunks={props.chunks} />
  </>
)
Index.getInitialProps = (ctx: any): any => {
  return {
    chunks: ctx.req.chunks,
  }
}

export default Index
