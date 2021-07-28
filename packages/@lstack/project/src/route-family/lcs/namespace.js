import { route, routeFamily } from '../../constructor'

import { NamespaceCreate, Namespaces } from '../../route/lcs'

export const Namespace = routeFamily(NamespaceCreate, Namespaces)

NamespaceCreate.setFamily(Namespace)
Namespaces.setFamily(Namespace)
