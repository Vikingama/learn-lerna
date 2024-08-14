import { route } from '../../constructor'
import { Index } from './console-index'

export const Overview = route('Overview', '', 'overview', {}, Index)

Index.setRedirectRoute(Overview)
