// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { NotFoundPage } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap.js'

export default async function NotFound() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (NotFoundPage as any)({ config, importMap })
}
