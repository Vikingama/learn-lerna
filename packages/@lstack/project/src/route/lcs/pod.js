import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Pods = route('Pods', '容器组', 'pods', {}, Index)
export const Pod = route('Pod', '容器组', 'pod', { clusterId: undefined, namespace: undefined, name: undefined }, Index)
