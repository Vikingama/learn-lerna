import { route } from '../../constructor'
import { Index } from './lcr-index'

export const Pipelines = route('Pipelines', '流水线', 'pipelines', {}, Index)
export const PipelineCreate = route('PipelineCreate', '创建流水线', 'pipeline-create', {}, Index)
export const PipelineUpdate = route(
  'PipelineUpdate',
  '编辑流水线',
  'pipeline-update',
  { instanceId: undefined, pipelineGroupId: undefined, pipelineId: undefined },
  Index
)
