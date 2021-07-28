import { route } from '../../constructor'
import { Index } from './lcs-index'
import { ChartMarket } from './chart-market'

export const ChartReleases = route('ChartReleases', '模板实例', 'chart-releases', {}, ChartMarket)
export const ChartRelease = route('ChartRelease', '模板实例', 'chart-release', {}, Index)
