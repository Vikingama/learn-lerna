import { route } from '../../constructor'
import { Index } from './cpc-index'

export const BackupPlans = route('BackupPlans', '备份计划', 'backup-plans', {}, Index)
export const BackupPlan = route(
  'BackupPlan',
  '备份计划',
  'backup-plan',
  { cloudProviderId: undefined, regionId: undefined, id: undefined, ackUid: undefined },
  Index
)
export const BackupPlanCreate = route('BackupPlanCreate', '创建备份计划', 'backup-plan-create', {}, Index)
export const BackupPlanConfig = route('BackupPlanConfig', '配置备份计划', 'backup-plan-config', {}, Index)
