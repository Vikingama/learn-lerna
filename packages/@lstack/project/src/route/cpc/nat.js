import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Nats = route('Nats', 'Nat 网关', 'nats', {}, Index)
export const Nat = route(
  'Nat',
  'Nat 网关',
  'nat',
  {
    cloudProviderId: undefined,
    regionId: undefined,
    id: undefined,
    ackUid: undefined,
    forwardTableIdLabel: undefined,
    snatTableIdLabel: undefined,
  },
  Index
)
export const NatCreate = route('NatCreate', '创建 Nat 网关', 'nat-create', {}, Index)
