import { routeFamily } from '../../constructor'
import { Service as ServiceRoute, ServiceCreate, ServiceUpdate, Services } from '../../route/lcs'

export const Service = routeFamily(ServiceCreate, Services, ServiceRoute, ServiceUpdate)

ServiceCreate.setFamily(Service)
ServiceUpdate.setFamily(Service)
Services.setFamily(Service)
ServiceRoute.setFamily(Service)
