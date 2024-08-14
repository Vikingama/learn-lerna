import { routeFamily } from '../../constructor'
import { HBase as HBaseRoute, HBases, HBaseCreate } from '../../route/cpc'

export const HBase = routeFamily(HBaseCreate, HBases, HBaseRoute)

HBaseRoute.setFamily(HBase)
HBases.setFamily(HBase)
HBaseCreate.setFamily(HBase)
