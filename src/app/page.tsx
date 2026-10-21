import { Metadata, Viewport } from 'next'
import Name from 'src/components/Name'

export default async function Page() {
  const response = await fetch('http://localhost:5000/api/chunks')
  const chunks = await response.json()
  return <Name chunks={chunks} />
}

export const metadata: Metadata = {
  title: 'N ER1 V AH0 S',
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
}

export const dynamic = 'force-dynamic'
