import { routeFamily } from '../../constructor'
import { Disk as DiskRoute, DiskCreate, Disks } from '../../route/cpc'

export const Disk = routeFamily(DiskCreate, Disks, DiskRoute)

DiskRoute.setFamily(Disk)
DiskCreate.setFamily(Disk)
Disks.setFamily(Disk)
