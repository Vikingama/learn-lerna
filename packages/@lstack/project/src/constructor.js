import { isNotEmptyArray, isNotEmptyObject, removeAttrs } from '@lstack/utils'

// TODO: 工具类抽离 by 吴斌
function isIp(ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

export function scope(name, domain, title) {
  return { name, domain, title }
}

export function project(id, name, baseUrl, iScope, routeMap = {}, routeFamilyMap = {}) {
  const routes = Object.values(routeMap)
  const routeFamilies = Object.values(routeFamilyMap)
  const result = {
    id,
    name,
    baseUrl,
    scope: iScope,
    routes,
    routeMap,
    index: routeMap.Index,
    routeFamilies,
    routeFamilyMap,
    setComponents(componentPoolsMap) {
      if (isNotEmptyArray(this.routes)) {
        this.routes.forEach(pRoute => {
          const component = componentPoolsMap[pRoute.name]
          if (component) {
            pRoute.setComponent(component)
          }
        })
      }
    },
    obtainRouteConfig() {
      const routesTree = routes.filter(pRoute => {
        return !pRoute.parent
      })

      return {
        linkActiveClass: 'active',
        linkExactActiveClass: 'active',
        mode: 'history',
        base: baseUrl,
        scrollBehavior: () => ({ x: 0, y: 0 }),
        routes: routesTree,
      }
    },
  }
  routes.forEach(iRoute => {
    iRoute.setProject(result)
    iRoute.setScope(iScope)
  })

  return result
}

export function route(name, title, path, query = {}, parent, redirectRoute) {
  let fullPath
  if (parent) {
    if (parent.fullPath.charAt(parent.fullPath.length - 1) !== '/') {
      fullPath = `${`${parent.fullPath}/`}${path}`
    } else {
      fullPath = `${parent.fullPath}${path}`
    }
  } else {
    fullPath = path
  }
  const result = {
    name,
    title,
    path,
    fullPath,
    query,
    parent,
    project,
    scope,
    family: undefined,
    component: undefined,
    setRedirectRoute(pRedirectRoute) {
      this.redirectRoute = pRedirectRoute
      this.redirect = pRedirectRoute ? pRedirectRoute.fullPath : undefined
    },
    setFamily(family) {
      this.family = family
    },
    setComponent(component) {
      this.component = component
    },
    setProject(iProject) {
      this.project = iProject
    },
    setScope(iScope) {
      this.scope = iScope
    },
    getQueryByInfo(info = {}) {
      return Object.keys(this.query).reduce((previousValue, currentKey) => {
        previousValue[currentKey] = info[currentKey]
        return previousValue
      }, {})
    },
    getIpHref(iQuery) {
      const currentLocation = window.location
      const href = `${currentLocation.protocol}//${currentLocation.host}${
        this.project.baseUrl ? this.project.baseUrl : ''
      }${this.fullPath}`

      let queryStr = ''
      const queryFiltered = removeAttrs(iQuery, [undefined], true)
      if (isNotEmptyObject(queryFiltered)) {
        queryStr = Object.keys(queryFiltered).reduce((previousValue, currentKey, currentIndex) => {
          return `${previousValue}${currentIndex !== 0 ? '&' : ''}${currentKey}=${queryFiltered[currentKey]}`
        }, '?')
      }
      return href + queryStr
    },
    getDomainHref(iQuery) {
      const currentLocation = window.location
      const hostSplits = currentLocation.host.split('.')
      hostSplits[0] = this.scope.domain
      const href = `${currentLocation.protocol}//${hostSplits.join('.')}${
        this.project.baseUrl ? this.project.baseUrl : ''
      }${this.fullPath}`

      let queryStr = ''
      const queryFiltered = removeAttrs(iQuery, [undefined], true)
      if (isNotEmptyObject(queryFiltered)) {
        queryStr = Object.keys(queryFiltered).reduce((previousValue, currentKey, currentIndex) => {
          return `${previousValue}${currentIndex !== 0 ? '&' : ''}${currentKey}=${queryFiltered[currentKey]}`
        }, '?')
      }
      return href + queryStr
    },
    getHref(iQuery) {
      const currentLocation = window.location
      return isIp(currentLocation.hostname) ? this.getIpHref(iQuery) : this.getDomainHref(iQuery)
    },
    getHrefByInfo(info = {}) {
      return this.getHref(this.getQueryByInfo(info))
    },
    getFullPath(iQuery) {
      let queryStr = ''
      const queryFiltered = removeAttrs(iQuery, [undefined], true)
      if (isNotEmptyObject(queryFiltered)) {
        queryStr = Object.keys(queryFiltered).reduce((previousValue, currentKey, currentIndex) => {
          return `${previousValue}${currentIndex !== 0 ? '&' : ''}${currentKey}=${queryFiltered[currentKey]}`
        }, '?')
      }
      return this.fullPath + queryStr
    },
    getFullPathByInfo(info = {}) {
      return this.getFullPath(this.getQueryByInfo(info))
    },
  }
  if (redirectRoute) {
    result.setRedirectRoute(redirectRoute)
  }
  if (parent) {
    if (isNotEmptyArray(parent.children)) {
      parent.children.push(result)
    } else {
      parent.children = [result]
    }
  }
  return result
}

export function routeFamily(create, list, info, update) {
  return {
    create,
    list,
    info,
    update,
  }
}
