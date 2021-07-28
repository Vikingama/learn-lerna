import { routeFamily } from '../../constructor'
import { Job as JobRoute, JobCreate, Jobs } from '../../route/lcs'

export const Job = routeFamily(JobCreate, Jobs, JobRoute)

JobCreate.setFamily(Job)
Jobs.setFamily(Job)
JobRoute.setFamily(Job)
