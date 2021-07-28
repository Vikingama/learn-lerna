import { routeFamily } from '../../constructor'
import { Slb as SlbRoute, SlbCreate, Slbs } from '../../route/cpc'

export const Slb = routeFamily(SlbCreate, Slbs, SlbRoute)

Slbs.setFamily(Slb)
SlbRoute.setFamily(Slb)
SlbCreate.setFamily(Slb)
