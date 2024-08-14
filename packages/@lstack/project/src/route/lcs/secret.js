import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Secrets = route('Secrets', '密钥', 'secrets', {}, Index)
export const Secret = route(
  'Secret',
  '密钥',
  'secret',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const SecretCreate = route('SecretCreate', '创建密钥', 'secret-create', {}, Index)
