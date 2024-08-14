import { routeFamily } from '../../constructor'
import {
  PersistentVolumeClaim as PersistentVolumeClaimRoute,
  PersistentVolumeClaimCreate,
  PersistentVolumeClaims,
} from '../../route/lcs'

export const PersistentVolumeClaim = routeFamily(
  PersistentVolumeClaimCreate,
  PersistentVolumeClaims,
  PersistentVolumeClaimRoute
)

PersistentVolumeClaimCreate.setFamily(PersistentVolumeClaim)
PersistentVolumeClaims.setFamily(PersistentVolumeClaim)
PersistentVolumeClaimRoute.setFamily(PersistentVolumeClaim)
