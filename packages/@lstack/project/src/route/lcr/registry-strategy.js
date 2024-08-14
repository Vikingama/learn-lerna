import { route } from '../../constructor'
import { Index } from './lcr-index'

export const RegistryStrategies = route('RegistryStrategies', '同步策略管理', 'registry-strategies', {}, Index)
export const RegistryStrategyCreate = route(
  'RegistryStrategyCreate',
  '创建同步策略',
  'registry-strategy-create',
  {},
  Index
)
export const RegistryStrategyUpdate = route(
  'RegistryStrategyUpdate',
  '修改同步策略',
  'registry-strategy-update',
  { id: undefined, instanceName: undefined },
  Index
)
