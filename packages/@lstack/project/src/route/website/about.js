import { route } from '../../constructor'
import { Index } from './website-index'

export const About = route('About', '关于我们-LStack 朗澈科技', 'about', {}, Index)
export const AboutUs = route('AboutUs', '关于我们-LStack 朗澈科技', 'us', {}, About)
export const JoinUs = route('JoinUs', '加入我们-LStack 朗澈科技', 'join', {}, About)
export const ContactUs = route('ContactUs', '联系我们-LStack 朗澈科技', 'contact', {}, About)
export const CompanyNews = route('CompanyNews', '公司新闻-LStack 朗澈科技', 'news', {}, About)
