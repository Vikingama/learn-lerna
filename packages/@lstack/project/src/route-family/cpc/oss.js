import { routeFamily } from '../../constructor'
import { Oss as OssRoute, OssCreate, Osses } from '../../route/cpc'

export const Oss = routeFamily(OssCreate, Osses, OssRoute)

OssRoute.setFamily(Oss)
OssCreate.setFamily(Oss)
Osses.setFamily(Oss)
