import { route } from '../../constructor'
import { Index } from './lcr-index'

export const CodeRepository = route('CodeRepositoryPageHub', '代码源配置', 'code-repository', {}, Index)
export const PublicCodeRepositories = route('PublicCodeRepositories', '官方仓库', 'public', {}, CodeRepository)
export const PrivateCodeRepositories = route('PrivateCodeRepositories', '自有仓库', 'private', {}, CodeRepository)

CodeRepository.setRedirectRoute(PublicCodeRepositories)
