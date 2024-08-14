import { routeFamily } from '../../constructor'
import { Addon as AddonRoute, Addons } from '../../route/lcs'

export const Addon = routeFamily(undefined, Addons, AddonRoute)

Addons.setFamily(Addon)
AddonRoute.setFamily(Addon)
