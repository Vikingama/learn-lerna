import { route } from '../../constructor'
import { SystemManagement } from './system'

export const NewsRelease = route('NewsRelease', '新闻发布', 'news-release', {}, SystemManagement)
export const UpdateNews = route('UpdateNews', '发布新闻', 'update-news', {}, SystemManagement)
export const NewsManage = route('NewsManage', '新闻列表', 'news-manage', {}, NewsRelease)
export const ColumnManage = route('ColumnManage', '栏目管理', 'column-manage', {}, NewsRelease)
