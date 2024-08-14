import { routeFamily } from '../../constructor'
import { BackupPlan as BackupPlanRoute, BackupPlanCreate, BackupPlanConfig, BackupPlans } from '../../route/cpc'

export const BackupPlan = routeFamily(BackupPlanCreate, BackupPlans, BackupPlanRoute, BackupPlanConfig)

BackupPlanRoute.setFamily(BackupPlan)
BackupPlanCreate.setFamily(BackupPlan)
BackupPlanConfig.setFamily(BackupPlan)
BackupPlans.setFamily(BackupPlan)
