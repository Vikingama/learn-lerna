import { routeFamily } from '../../constructor'
import { AddonTemplate as AddonTemplateRoute, AddonTemplates } from '../../route/lcs'

export const AddonTemplate = routeFamily(undefined, AddonTemplates, AddonTemplateRoute)

AddonTemplates.setFamily(AddonTemplate)
AddonTemplateRoute.setFamily(AddonTemplate)
