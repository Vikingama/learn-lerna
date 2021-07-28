import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Jobs = route('Jobs', '普通任务', 'jobs', {}, Index)
export const Job = route(
  'Job',
  '普通任务',
  'job',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const JobCreate = route('JobCreate', '创建普通任务', 'job-create', {}, Index)
