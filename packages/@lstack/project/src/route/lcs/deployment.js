import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Deployments = route('Deployments', '无状态工作负载', 'deployments', {}, Index)
export const Deployment = route(
  'Deployment',
  '无状态工作负载',
  'deployment',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const DeploymentCreate = route('DeploymentCreate', '创建无状态工作负载', 'deployment-create', {}, Index)
