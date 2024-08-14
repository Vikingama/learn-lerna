import { route } from '../../constructor'
import { Index } from './lcr-index'

export const Instances = route('Instances', '实例列表', 'instances', {}, Index)
export const InstanceCreate = route('InstanceCreate', '创建实例', 'instance-create', {}, Index)
