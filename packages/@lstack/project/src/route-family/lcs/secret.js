import { routeFamily } from '../../constructor'
import { Secret as SecretRoute, SecretCreate, Secrets } from '../../route/lcs'

export const Secret = routeFamily(SecretCreate, Secrets, SecretRoute)

SecretCreate.setFamily(Secret)
Secrets.setFamily(Secret)
SecretRoute.setFamily(Secret)
