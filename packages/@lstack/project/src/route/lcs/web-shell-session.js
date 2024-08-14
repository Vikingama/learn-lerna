import { route } from '../../constructor'

export const WebShellSessionCreate = route(
  'WebShellSessionCreate',
  '创建 WebShell Session',
  '/web-shell-session-create',
  { clusterId: undefined, namespace: undefined, pod: undefined, container: undefined }
)
