import { route } from '../../constructor'
import { Index } from './uc-index'

export const SrcManage = route('SrcManage', '资源管理', 'src-manage', {}, Index)
export const LStackSrcBag = route('LStackSrcBag', 'LStack 资源包', 'lstack', {}, SrcManage)
export const MarketSrcBag = route('MarketSrcBag', '云市场资源包', 'market', {}, SrcManage)
