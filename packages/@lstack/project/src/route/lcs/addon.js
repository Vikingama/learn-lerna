import { route } from '../../constructor'
import { Index } from './lcs-index'
import { AddonMarket } from './addon-market'

export const Addons = route('Addons', '插件实例', 'addons', {}, AddonMarket)
export const Addon = route('Addon', '插件实例', 'addon', {}, Index)
