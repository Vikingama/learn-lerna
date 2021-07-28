import { route } from '../../constructor'
import { SnapshotManagement } from './snapshot-management'
import { Index } from './cpc-index'

export const SnapshotLinks = route('SnapshotLinks', '快照链', 'snapshot-links', {}, SnapshotManagement)
export const SnapshotLink = route(
  'SnapshotLink',
  '快照链',
  'snapshot-link',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
