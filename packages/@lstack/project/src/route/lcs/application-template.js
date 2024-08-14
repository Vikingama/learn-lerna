import { route } from '../../constructor'
import { Index } from './lcs-index'

export const ApplicationTemplates = route('ApplicationTemplates', '应用模板', 'application-templates', {}, Index)
export const ApplicationTemplate = route('ApplicationTemplate', '应用模板', 'application-template', {}, Index)
export const ApplicationTemplateCreate = route(
  'ApplicationTemplateCreate',
  '创建应用模板',
  'application-template-create',
  {},
  Index
)
