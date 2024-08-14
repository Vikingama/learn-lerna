import { routeFamily } from '../../constructor'
import { StorageClass as StorageClassRoute, StorageClassCreate, StorageClasses } from '../../route/lcs'

export const StorageClass = routeFamily(StorageClassCreate, StorageClasses, StorageClassRoute)

StorageClassCreate.setFamily(StorageClass)
StorageClasses.setFamily(StorageClass)
StorageClassRoute.setFamily(StorageClass)
