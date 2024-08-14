import { routeFamily } from '../../constructor'
import { Eip as EipRoute, EipCreate, Eips } from '../../route/cpc'

export const Eip = routeFamily(EipCreate, Eips, EipRoute)

EipRoute.setFamily(Eip)
EipCreate.setFamily(Eip)
Eips.setFamily(Eip)
