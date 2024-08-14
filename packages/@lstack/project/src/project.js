import {
  console as consoleScope,
  market as marketScope,
  manager as managerScope,
  website as websiteScope,
} from './scope'
import { project } from './constructor'

// ----------- console --------------//
import * as accountRouteMap from './route/account'
import * as ahsRouteMap from './route/ahs'
import * as authRouteMap from './route/auth'
import * as caRouteMap from './route/ca'
import * as consoleRouteMap from './route/console'
import * as cpcRouteMap from './route/cpc'
import * as cpmRouteMap from './route/cpm'
import * as csmRouteMap from './route/csm'
import * as iamRouteMap from './route/iam'
import * as lcrRouteMap from './route/lcr'
import * as lcsRouteMap from './route/lcs'
import * as opsRouteMap from './route/ops'
import * as ucRouteMap from './route/uc'
import * as workorderRouteMap from './route/workorder'

import * as lcsRouteFamilyMap from './route-family/lcs'
import * as cpcRouteFamilyMap from './route-family/cpc'
import * as workorderRouteFamilyMap from './route-family/workorder'
import * as isvRouteFamilyMap from './route-family/isv'
import * as iamRouteFamilyMap from './route-family/iam'

// ----------- manager --------------//
import * as omsRouteMap from './route/oms'

// ----------- market --------------//
import * as isvRouteMap from './route/isv'
import * as marketRouteMap from './route/market'
import * as smsRouteMap from './route/sms'
import * as tenantRouteMap from './route/tenant'

// ----------- website --------------//
import * as buyRouteMap from './route/buy'
import * as documentRouteMap from './route/document'
import * as websiteRouteMap from './route/website'

export const account = project('account', '账号管理', '/account', consoleScope, accountRouteMap)
export const ahs = project('ahs', '应用托管服务', '/ahs', consoleScope, ahsRouteMap)
export const auth = project('auth', '登录', '/auth', consoleScope, authRouteMap)
export const ca = project('ca', '运营中心', '/ca', consoleScope, caRouteMap)
export const console = project('console', '控制台', undefined, consoleScope, consoleRouteMap)
export const cpc = project('cpc', '云服务商目录', '/cpc', consoleScope, cpcRouteMap, cpcRouteFamilyMap)
export const cpm = project('cpm', '云服务商监控', '/cpm', consoleScope, cpmRouteMap)
export const csm = project('csm', '云服务监控', '/csm', consoleScope, csmRouteMap)
export const document = project('document', '帮助文档', '/document', consoleScope, documentRouteMap)
export const iam = project('iam', 'IAM 服务', '/iam', consoleScope, iamRouteMap,iamRouteFamilyMap)
export const lcr = project('lcr', '容器镜像服务', '/lcr', consoleScope, lcrRouteMap)
export const lcs = project('lcs', '容器服务', '/lcs', consoleScope, lcsRouteMap, lcsRouteFamilyMap)
export const ops = project('ops', 'License', '/ops', consoleScope, opsRouteMap)
export const uc = project('uc', '用户中心', '/uc', consoleScope, ucRouteMap)
export const workorder = project(
  'workorder',
  '支持与服务',
  '/workorder',
  consoleScope,
  workorderRouteMap,
  workorderRouteFamilyMap
)

export const oms = project('oms', '运营管理后台', undefined, managerScope, omsRouteMap)

export const isv = project('isv', '卖家中心', '/isv', marketScope, isvRouteMap, isvRouteFamilyMap)
export const market = project('market', '云市场', undefined, marketScope, marketRouteMap)
export const sms = project('sms', '短信服务', '/sms', marketScope, smsRouteMap)
export const tenant = project('tenant', '买家中心', '/tenant', marketScope, tenantRouteMap)

export const buy = project('buy', '产品购买', '/buy', websiteScope, buyRouteMap)
export const website = project('home', '主页', undefined, websiteScope, websiteRouteMap)
