import { route } from '../../constructor'
import { Index } from './website-index'

export const Introduction = route('Introduction', '产品-LStack 朗澈科技', 'introduction', {}, Index)
export const Management = route('Management', '混合云管理平台-LStack 朗澈科技', 'management', {}, Introduction)
export const Container = route('Container', '容器混合云平台-LStack 朗澈科技', 'container', {}, Introduction)
export const Application = route('Application', '应用管理平台-LStack 朗澈科技', 'application', {}, Introduction)
