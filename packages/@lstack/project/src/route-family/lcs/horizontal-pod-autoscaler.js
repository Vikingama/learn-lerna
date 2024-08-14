import { routeFamily } from '../../constructor'
import {
  HorizontalPodAutoscaler as HorizontalPodAutoscalerRoute,
  HorizontalPodAutoscalerCreate,
  HorizontalPodAutoscalers,
} from '../../route/lcs'

export const HorizontalPodAutoscaler = routeFamily(
  HorizontalPodAutoscalerCreate,
  HorizontalPodAutoscalers,
  HorizontalPodAutoscalerRoute
)

HorizontalPodAutoscalerCreate.setFamily(HorizontalPodAutoscaler)
HorizontalPodAutoscalers.setFamily(HorizontalPodAutoscaler)
HorizontalPodAutoscalerRoute.setFamily(HorizontalPodAutoscaler)
