import { routeFamily } from '../../constructor'
import { Vpc as VpcRoute, VpcCreate, Vpcs } from '../../route/cpc'

export const Vpc = routeFamily(VpcCreate, Vpcs, VpcRoute)

VpcCreate.setFamily(Vpc)
Vpcs.setFamily(Vpc)
VpcRoute.setFamily(Vpc)
