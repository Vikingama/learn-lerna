import axios from 'axios'
import { mapKvs, isObject, checkType } from '@lstack/utils'
import { defaultRequestInterceptor, defaultResponseInterceptor } from './interceptor'

let mInstance

// TODO: xsrfCookieName Cookie与CSRF(XSRF) by 吴斌
const defaultConfig = {
  withCredentials: true,
  timeout: 40000,
  paramsSerializer: params => {
    const paramKvs = mapKvs(params)

    const parts = []

    paramKvs.forEach((kvs = {}) => {
      const { key } = kvs
      let { value } = kvs
      if (value !== null && typeof value !== 'undefined') {
        if (checkType(value, 'Date')) {
          value = value.toISOString()
        } else if (isObject(value)) {
          value = JSON.stringify(value)
        }
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      }
    })

    return parts.join('&')
  },
}

const initInstance = config => {
  const instance = axios.create(config)

  instance.interceptors.request.use(defaultRequestInterceptor.onFulfilled, defaultRequestInterceptor.onRejected)
  instance.interceptors.response.use(defaultResponseInterceptor.onFulfilled, defaultResponseInterceptor.onRejected)
  mInstance = instance
}

const getInstance = () => {
  if (!mInstance) {
    initInstance(defaultConfig)
  }
  return mInstance
}

const initialize = config => {
  initInstance(config)
}

const addRequestInterceptors = getInstance().interceptors.request.use
const removeRequestInterceptors = getInstance().interceptors.request.eject
const addResponseInterceptors = getInstance().interceptors.response.use
const removeResponseInterceptors = getInstance().interceptors.response.eject
const { isCancel } = axios

/**
 * 网络请求函数
 * @param {string|undefined}url
 * @param {string|undefined}method
 * @param {Object|undefined}query 路径查询参数
 * @param {Object|undefined}body 请求体 body 参数
 * @param {Object|undefined}config AxiosRequestConfig
 * @param {Object|Array.<Object>|undefined}config.cancelHandle
 * @param {string|undefined}config.requestId
 * @returns {Promise<Object>}
 */
const ajax = (url, method = 'GET', { query, body } = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    // 忽略方法参数大小写，统一转成小写
    const methodUpper = method.toLowerCase()
    const { cancelHandle, requestId, ...axiosRequestConfig } = config

    if (!axiosRequestConfig.cancelToken) {
      axiosRequestConfig.cancelToken = new axios.CancelToken(function executor(c) {
        if (cancelHandle) {
          if (Object.prototype.toString.call(cancelHandle) === '[object Array]') {
            cancelHandle.push(c)
          } else if (Object.prototype.toString.call(cancelHandle) === '[object Object]') {
            cancelHandle.cancel = c
          }
        }
      })
    }
    if (!axiosRequestConfig.method) axiosRequestConfig.method = methodUpper
    if (!axiosRequestConfig.params) axiosRequestConfig.params = query
    if (!axiosRequestConfig.data) axiosRequestConfig.data = body
    axiosRequestConfig.url = url

    getInstance()
      .request(axiosRequestConfig)
      .then(response => {
        const newRes = { requestId, ...response }
        resolve(newRes)
        return newRes
      })
      .catch(error => {
        const newErr = { requestId, ...error }
        reject(newErr)
      })
  })
}

const newInstance = config => axios.create(config)

export default {
  initialize,
  addRequestInterceptors,
  removeRequestInterceptors,
  addResponseInterceptors,
  removeResponseInterceptors,
  isCancel,
  ajax,
  newInstance,
}
