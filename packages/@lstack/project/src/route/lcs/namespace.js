import { route } from '../../constructor'
import { Index } from './lcs-index'

export const Namespaces = route('Namespaces', '命名空间', 'namespaces', {}, Index)
export const NamespaceCreate = route('NamespaceCreate', '创建命名空间', 'namespace-create', {}, Index)
