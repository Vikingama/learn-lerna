import { routeFamily } from '../../constructor'
import { CronJob as CronJobRoute, CronJobCreate, CronJobs } from '../../route/lcs/cron-job'

export const CronJob = routeFamily(CronJobCreate, CronJobs, CronJobRoute)

CronJobCreate.setFamily(CronJob)
CronJobs.setFamily(CronJob)
CronJobRoute.setFamily(CronJob)
