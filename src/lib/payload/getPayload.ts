import { getPayload as getPayloadBase } from 'payload'
import config from '@payload-config'

export async function getPayload() {
  return getPayloadBase({ config })
}
