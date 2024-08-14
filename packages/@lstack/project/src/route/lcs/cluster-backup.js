import { route } from '../../constructor'
import { Index } from './lcs-index'

export const ClusterBackup = route('ClusterBackup', '集群备份', 'cluster-backup', {}, Index)
export const ClusterBackupCreate = route('ClusterBackupCreate', '新建备份', 'cluster-backup-create', {}, Index)
export const BackupRestore = route('BackupRestore', '恢复备份', 'backup-restore', {}, Index)
export const BackupOperateLog = route('BackupOperateLog', '操作记录', 'backup-operate-log', {}, Index)

export const ClusterBackupLocation = route('ClusterBackupLocation', '备份位置', 'cluster-backup-location', {}, Index)
export const ClusterBackupLocationCreate = route(
  'ClusterBackupLocationCreate',
  '新建备份位置',
  'cluster-backup-location-create',
  {},
  Index
)
