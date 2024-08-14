import { routeFamily } from '../../constructor'
import { Commodity as CommodityRoute, Commodities, CommodityCreate, CommodityUpdate } from '../../route/isv/commodity'
export const Commodity = routeFamily(CommodityCreate, Commodities, CommodityRoute, CommodityUpdate)

CommodityCreate.setFamily(Commodity)
Commodities.setFamily(Commodity)
CommodityRoute.setFamily(Commodity)
CommodityUpdate.setFamily(Commodity)
