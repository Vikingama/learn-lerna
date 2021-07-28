import Cookies from './cookie'

let appInstance
let routerInstance
let storeInstance
let mProject

const getProject = () => mProject

const setProject = project => {
  mProject = project
}

const getCookies = () => Cookies

const setApp = instance => {
  appInstance = instance
}

const getApp = () => appInstance

const setRouter = router => {
  routerInstance = router
}

const getRouter = () => routerInstance

const setStore = store => {
  storeInstance = store
}

const getStore = () => storeInstance

export default {
  setApp,
  getApp,
  setRouter,
  getRouter,
  setStore,
  getStore,
  getCookies,
  getProject,
  setProject,
}
