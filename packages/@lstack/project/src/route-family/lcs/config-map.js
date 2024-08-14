import { routeFamily } from '../../constructor'
import { ConfigMap as ConfigMapRoute, ConfigMapCreate, ConfigMaps } from '../../route/lcs'

export const ConfigMap = routeFamily(ConfigMapCreate, ConfigMaps, ConfigMapRoute)

ConfigMapCreate.setFamily(ConfigMap)
ConfigMaps.setFamily(ConfigMap)
ConfigMapRoute.setFamily(ConfigMap)
