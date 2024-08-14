import { route } from '../../constructor'
import { SnapshotManagement } from './snapshot-management'

export const Snapshots = route('Snapshots', '快照列表', 'snapshots', {}, SnapshotManagement)
export const SnapshotCreate = route('SnapshotCreate', '创建快照', 'snapshot-create', {}, SnapshotManagement)

SnapshotManagement.setRedirectRoute(Snapshots)
