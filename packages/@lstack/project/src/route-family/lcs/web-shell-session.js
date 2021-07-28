import { routeFamily } from '../../constructor'

import { WebShellSessionCreate } from '../../route/lcs'

export const WebShellSession = routeFamily(WebShellSessionCreate)

WebShellSessionCreate.setFamily(WebShellSession)
