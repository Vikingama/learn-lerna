import { routeFamily } from '../../constructor'
import { Application as ApplicationRoute, ApplicationCreate, Applications } from '../../route/lcs'

export const Application = routeFamily(ApplicationCreate, Applications, ApplicationRoute)

ApplicationCreate.setFamily(Application)
Applications.setFamily(Application)
ApplicationRoute.setFamily(Application)
