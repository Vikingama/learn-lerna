import { routeFamily } from '../../constructor'
import { Ecs as EcsRoute, EcsCreate, Ecses } from '../../route/cpc'

export const Ecs = routeFamily(EcsCreate, Ecses, EcsRoute)

EcsRoute.setFamily(Ecs)
EcsCreate.setFamily(Ecs)
Ecses.setFamily(Ecs)
