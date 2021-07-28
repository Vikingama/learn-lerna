import { route } from '../../constructor'
import { Index } from './isv-index'

export const GoodsManage = route('GoodsManage', '商品管理', 'goods-manage', {}, Index)
export const Commodities = route('Commodities', '我的商品', 'commodity', {}, GoodsManage)
export const CommodityCreate = route('CommodityCreate', '商品发布', 'commodity-create', {}, GoodsManage)
export const CommodityUpdate = route('CommodityUpdate', '修改商品', 'commodity-update', {}, GoodsManage)
