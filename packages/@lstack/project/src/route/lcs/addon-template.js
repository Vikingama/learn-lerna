import { route } from '../../constructor'
import { Index } from './lcs-index'
import { AddonMarket } from './addon-market'

export const AddonTemplates = route('AddonTemplates', '插件市场', 'addon-templates', {}, AddonMarket)
export const AddonTemplate = route('AddonTemplate', '插件市场', 'addon-template', { name: undefined }, Index)

export const AddonInstall = route('AddonInstall', '插件安装', 'addon-install', { name: undefined }, Index)

AddonMarket.setRedirectRoute(AddonTemplates)
