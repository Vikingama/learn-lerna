import { route } from '../../constructor'
import { Index } from './lcs-index'
import { ChartMarket } from './chart-market'

export const Charts = route('Charts', '官方模板', 'charts', {}, ChartMarket)
export const Chart = route('Chart', '官方模板', 'chart', {}, Index)

export const ChartInstall = route('ChartInstall', '模板安装', 'chart-install', { name: undefined }, Index)

ChartMarket.setRedirectRoute(Charts)
