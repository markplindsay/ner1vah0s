import Head from 'next/head'
import React from 'react'
import Name from '../components/Name'
import { Chunks, PageContext } from '../types'

type Props = {
  chunks?: Chunks
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
    {props.chunks &&
      <Name chunks={props.chunks} />
    }
    <style global jsx>{`
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
      }
    `}</style>
  </>
)
Index.getInitialProps = (pageContext: PageContext): Props => {
  if (pageContext.req !== undefined) {
    return {
      chunks: pageContext.req.chunks,
    }
  }
  return {}
}

export default Index
