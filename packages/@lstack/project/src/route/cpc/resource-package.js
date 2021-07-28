import { route } from '../../constructor'
import { Index } from './cpc-index'

export const ResourcePackages = route('ResourcePackages', '资源包', 'resource-packages', {}, Index)
export const ResourcePackageCreate = route('ResourcePackageCreate', '创建资源包', 'resource-package-create', {}, Index)
