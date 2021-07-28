import { route } from '../../constructor'
import { Index } from './cpc-index'

export const Ecses = route('Ecses', '云主机', 'ecses', {}, Index)
export const Ecs = route(
  'Ecs',
  '云主机',
  'ecs',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const EcsCreate = route('EcsCreate', '创建云主机', 'ecs-create', {}, Index)

Index.setRedirectRoute(Ecses)
