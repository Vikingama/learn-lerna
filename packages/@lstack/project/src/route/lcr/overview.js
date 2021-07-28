import { route } from '../../constructor'
import { Index } from './lcr-index'

export const Overview = route('Overview', '总览', 'overview', {}, Index)

Index.setRedirectRoute(Overview)
