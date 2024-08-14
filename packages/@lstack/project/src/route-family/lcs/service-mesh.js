import { routeFamily } from '../../constructor'
import { ServiceMeshes } from '../../route/lcs'

export const ServiceMesh = routeFamily(undefined, ServiceMeshes)

ServiceMeshes.setFamily(ServiceMesh)
