import { routeFamily } from '../../constructor'
import { ChartRelease as ChartReleaseRoute, ChartReleases } from '../../route/lcs/chart-release'

export const ChartRelease = routeFamily(undefined, ChartReleases, ChartReleaseRoute)

ChartReleases.setFamily(ChartRelease)
ChartReleaseRoute.setFamily(ChartRelease)
