import * as ProjectMap from '../src/project'
import * as ScopeMap from '../src/scope'

export * from '../src/project'
export const projects = Object.values(ProjectMap)
export const scopes = Object.values(ScopeMap)
export const projectMap = ProjectMap
export const scopeMap = ScopeMap
