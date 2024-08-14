import { routeFamily } from '../../constructor'
import { Nat as NatRoute, NatCreate, Nats } from '../../route/cpc'

export const Nat = routeFamily(NatCreate, Nats, NatRoute)

NatRoute.setFamily(Nat)
NatCreate.setFamily(Nat)
Nats.setFamily(Nat)
