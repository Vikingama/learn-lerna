import { route } from '../../constructor'
import { Index } from './ahs-index'

export const Clusters = route('Clusters', '容器集群', 'clusters', {}, Index)

Index.setRedirectRoute(Clusters)
