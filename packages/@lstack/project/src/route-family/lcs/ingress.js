import { routeFamily } from '../../constructor'
import { Ingress as IngressRoute, IngressCreate, Ingresses, IngressUpdate } from '../../route/lcs/ingress'

export const Ingress = routeFamily(IngressCreate, Ingresses, IngressRoute, IngressUpdate)

IngressUpdate.setFamily(Ingress)
IngressCreate.setFamily(Ingress)
Ingresses.setFamily(Ingress)
IngressRoute.setFamily(Ingress)
