import { route } from '../../constructor'
import { Index } from './lcs-index'

export const CronJobs = route('CronJobs', '定时任务', 'cron-jobs', {}, Index)
export const CronJob = route(
  'CronJob',
  '定时任务',
  'cron-job',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const CronJobCreate = route('CronJobCreate', '创建定时任务', 'cron-job-create', {}, Index)
