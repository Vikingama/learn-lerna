import { routeFamily } from '../../constructor'
import { DaemonSet as DaemonSetRoute, DaemonSetCreate, DaemonSets } from '../../route/lcs'

export const DaemonSet = routeFamily(DaemonSetCreate, DaemonSets, DaemonSetRoute)

DaemonSetCreate.setFamily(DaemonSet)
DaemonSets.setFamily(DaemonSet)
DaemonSetRoute.setFamily(DaemonSet)
