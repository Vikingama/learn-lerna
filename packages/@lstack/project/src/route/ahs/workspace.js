import { route } from '../../constructor'
import { Index } from './ahs-index'

export const Workspaces = route('Workspaces', '项目', 'workspaces', {}, Index)
export const Workspace = route('Workspace', '项目', 'workspace', {}, Index)
export const WorkspaceCreate = route('WorkspaceCreate', '项目', 'workspace-create', {}, Index)
