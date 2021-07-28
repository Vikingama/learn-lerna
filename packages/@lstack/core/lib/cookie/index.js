import JsCookie from 'js-cookie'

const tokenKey = 'token'
const accountKey = 'account'
const userKey = 'user'
const verifyCodeKey = 'verifyCode'
const cookieConf = {}

// TODO: 工具类抽离 by 吴斌
function isIp(ip) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

const currentLocation = window.location
cookieConf.domain = isIp(currentLocation.hostname)
  ? currentLocation.hostname
  : currentLocation.hostname.replace(`${currentLocation.hostname.split('.')[0]}.`, '')

const { set, get, remove } = JsCookie

const setToken = token => {
  return set(tokenKey, token, cookieConf)
}

const getToken = () => {
  return get(tokenKey, cookieConf)
}

const removeToken = () => {
  return remove(tokenKey, cookieConf)
}

const setAccount = account => {
  return set(accountKey, account, cookieConf)
}

const getAccount = () => {
  return get(accountKey, cookieConf)
}

const removeAccount = () => {
  return remove(accountKey, cookieConf)
}

const setUser = user => {
  return set(userKey, user, cookieConf)
}

const getUser = () => {
  return get(userKey, cookieConf)
}

const removeUser = () => {
  return remove(userKey, cookieConf)
}

const setVerifyCode = verifyCode => {
  return set(verifyCodeKey, verifyCode, cookieConf)
}

const removeVerifyCode = () => {
  return remove(verifyCodeKey, cookieConf)
}

const clearLoginInfo = () => {
  removeToken()
  removeVerifyCode()
}

export default {
  set,
  get,
  remove,
  setToken,
  getToken,
  removeToken,
  setAccount,
  getAccount,
  removeAccount,
  setUser,
  getUser,
  removeUser,
  setVerifyCode,
  removeVerifyCode,
  clearLoginInfo,
}
