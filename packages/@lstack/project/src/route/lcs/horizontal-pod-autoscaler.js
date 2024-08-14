import { route } from '../../constructor'
import { Index } from './lcs-index'

export const HorizontalPodAutoscalers = route(
  'HorizontalPodAutoscalers',
  '工作负载伸缩',
  'horizontal-pod-autoscalers',
  {},
  Index
)
export const HorizontalPodAutoscaler = route(
  'HorizontalPodAutoscaler',
  '工作负载伸缩',
  'horizontal-pod-autoscaler',
  { clusterId: undefined, namespace: undefined, name: undefined },
  Index
)
export const HorizontalPodAutoscalerCreate = route(
  'HorizontalPodAutoscalerCreate',
  '创建 HPA 策略',
  'horizontal-pod-autoscaler-create',
  {},
  Index
)
