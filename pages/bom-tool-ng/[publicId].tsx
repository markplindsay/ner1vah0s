import jwt from 'jsonwebtoken'
import isString from 'lodash/isString'
import { useEffect } from 'react'
import getConfig from 'next/config'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

type Credentials = {
  baseUrl: string
  deployment: string
  editingKey?: string
  publicId?: string
  user?: {
    email: string
    id: string
  }
}

type Props = {
  country?: string
  currency?: string
  deployment: string
  token?: string
}

const config = getConfig()

const BomToolNgPage = ({ country, currency, deployment, token }: Props) => {
  const host = config.publicRuntimeConfig.bomToolHost
  useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.src = `${host}/static/bom-tool.js`
    document.body.appendChild(script)
    return () => {
      // Tell the embedded BOM Tool to destroy itself on client-side navigation
      window.dispatchEvent(new Event('beforeunload'))
      try {
        document.body.removeChild(script)
      } catch {}
    }
  }, [])
  if (!deployment || !host || !token) {
    return null
  }
  const bomParams = {
    country,
    currency,
    deployment,
    host,
    token,
  }
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bomParams) }}
        id="bom-tool-params"
        type="application/json"
      />
      <div id="bom-tool" />
      <style global jsx>{`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
        html {
          -webkit-tap-highlight-color: #0000;
        }
        body {
          background: #f0f0f0;
          color: #333;
          font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 14px;
          line-height: 20px;
          margin: 0;
        }
        body.modal-open {
          overflow: hidden;
        }
        body.using-mouse :focus {
          outline: none;
        }
        mark {
          font-weight: bold;
          color: inherit;
          background-color: transparent;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  )
}

export const getHost = (
  ctx: GetServerSidePropsContext,
  includePort: boolean = false
): string | undefined => {
  if (
    process.browser ||
    !ctx.req ||
    Object.keys(ctx.req.headers).length === 0
  ) {
    if (typeof window !== 'undefined') {
      return window.location.hostname
    }
    return undefined
  }
  if (ctx.req && ctx.req.headers) {
    let host = ctx.req.headers['x-forwarded-host'] || ctx.req.headers.host
    if (Array.isArray(host)) {
      host = host[0]
    }
    if (host) {
      if (!includePort) {
        return host.split(':')[0]
      }
      return host
    }
  }
  return undefined
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const hostIncludingPort = getHost(ctx, true)
  const config = getConfig()
  const deployment = 'octopart'
  let props: Props = {
    deployment,
  }
  if (ctx.res) {
    const credentials: Credentials = {
      baseUrl: `${config.serverRuntimeConfig.bomToolProto}://${hostIncludingPort}/bom-tool`,
      deployment,
    }
    if (ctx.query.publicId && isString(ctx.query.publicId)) {
      credentials.publicId = ctx.query.publicId
    }
    const token = jwt.sign(
      credentials,
      config.serverRuntimeConfig.bomToolSecret
    )
    if (!token) {
      ctx.res.statusCode = 404
      ctx.res.end()
      return { props }
    }
    props.token = token
    return { props }
  }
  return { props }
}

export default BomToolNgPage

