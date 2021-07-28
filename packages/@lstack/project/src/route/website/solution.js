import { route } from '../../constructor'
import { Index } from './website-index'

export const Solution = route('Solution', '解决方案-LStack 朗澈科技', 'solution', {}, Index)
export const Hybrid = route('Hybrid', '混合云服务解决方案-LStack 朗澈科技', 'hybrid', {}, Solution)
export const Medical = route('Medical', '医疗解决方案-LStack 朗澈科技', 'medical', {}, Solution)
export const Water = route('Water', '水利解决方案-LStack 朗澈科技', 'water', {}, Solution)
export const Agriculture = route('Agriculture', '农业解决方案-LStack 朗澈科技', 'agriculture', {}, Solution)
