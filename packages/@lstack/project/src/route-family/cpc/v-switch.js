import { routeFamily } from '../../constructor'
import { VSwitch as VSwitchRoute, VSwitchCreate, VSwitches } from '../../route/cpc'

export const VSwitch = routeFamily(VSwitchCreate, VSwitches, VSwitchRoute)

VSwitchCreate.setFamily(VSwitch)
VSwitches.setFamily(VSwitch)
VSwitchRoute.setFamily(VSwitch)
