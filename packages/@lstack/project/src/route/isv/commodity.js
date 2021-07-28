import { route } from '../../constructor'
import { Index } from './isv-index'

export const Commodities = route('Commodities', '我的商品', 'commodities', {}, Index)
export const Commodity = route('Commodity', '我的商品', 'commodity', {}, Index)
export const CommodityCreate = route('CommodityCreate', '商品发布', 'commodity-create', {}, Index)
export const CommodityUpdate = route('CommodityUpdate', '修改商品', 'commodity-update', {}, Index)
