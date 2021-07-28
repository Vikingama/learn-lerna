import { routeFamily } from '../../constructor'
import { CloudImage as ImageRoute, ImageImport, Images } from '../../route/cpc'

export const CloudImage = routeFamily(ImageImport, Images, ImageRoute)

ImageRoute.setFamily(CloudImage)
Images.setFamily(CloudImage)
ImageImport.setFamily(CloudImage)
