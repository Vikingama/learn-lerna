import { scope } from './constructor'

export const console = scope('console', 'console', '控制台')
export const manager = scope('manager', undefined, '管理后台')
export const website = scope('website', 'www', '主页')
export const market = scope('market', 'market', '云市场')
