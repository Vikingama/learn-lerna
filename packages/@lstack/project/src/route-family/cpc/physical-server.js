import { routeFamily } from '../../constructor'
import { PhysicalServer as PhysicalServerRoute, PhysicalServerCreate, PhysicalServers } from '../../route/cpc'

export const PhysicalServer = routeFamily(PhysicalServerCreate, PhysicalServers, PhysicalServerRoute)

PhysicalServerRoute.setFamily(PhysicalServer)
PhysicalServerCreate.setFamily(PhysicalServer)
PhysicalServers.setFamily(PhysicalServer)
