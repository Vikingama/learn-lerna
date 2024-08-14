import { routeFamily } from '../../constructor'
import { Chart as ChartRoute, Charts } from '../../route/lcs'

export const Chart = routeFamily(undefined, Charts, ChartRoute)

Charts.setFamily(Chart)
ChartRoute.setFamily(Chart)
