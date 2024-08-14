import { routeFamily } from '../../constructor'
import { StatefulSet as StatefulSetRoute, StatefulSetCreate, StatefulSets } from '../../route/lcs'

export const StatefulSet = routeFamily(StatefulSetCreate, StatefulSets, StatefulSetRoute)

StatefulSetCreate.setFamily(StatefulSet)
StatefulSets.setFamily(StatefulSet)
StatefulSetRoute.setFamily(StatefulSet)
