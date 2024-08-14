import { Cookie } from '@lstack/core'
import axios from 'axios'
import { cloneDeepWith, isObject } from '@lstack/utils'
import ErrorCode from './error-code'

export const defaultRequestInterceptor = {
  onFulfilled: config => {
    const newConfig = { ...config }
    // 我们要的效果是，拦截器的 token 配置优先级低于用户发送 api 请求时自定义的配置，所以只在用户没手动指定 token 时才使用拦截器赋值
    if (!newConfig.headers.token) {
      newConfig.headers.token = Cookie.getToken()
    }
    if (!newConfig.headers['Accept-Language']) {
      newConfig.headers['Accept-Language'] = 'zh_cn'
    }
    return newConfig
  },
  onRejected: error => {
    return Promise.reject(error)
  },
}

export const defaultResponseInterceptor = {
  onFulfilled: response => {
    const { status: httpStatusCode, statusText: httpStatusText } = response
    const resData = response.data

    let errCode
    let msg
    let apiData

    if (isObject(resData)) {
      // 将后端值为 null 的字段替换为 undefined
      cloneDeepWith(resData, (value, key, object) => {
        if (value === null) {
          object[key] = undefined
        }
      })

      if (httpStatusCode >= 200 && httpStatusCode < 300) {
        const { status: apiStatusCode } = resData
        if (apiStatusCode === 0 || (apiStatusCode >= 200 && apiStatusCode < 300)) {
          return response
        }
      }
      errCode = resData.status
      msg =
        resData.msg ||
        resData.message ||
        resData.resMsg ||
        `请求报错,错误码:${resData.status} 请求地址 : ${response.config.url}`
      apiData = resData.data
    } else {
      if (httpStatusCode >= 200 && httpStatusCode < 300) {
        return resData
      }
      errCode = httpStatusCode
      msg = httpStatusText
    }

    const newError = { code: errCode, msg, apiData }
    return Promise.reject(newError)
  },
  onRejected: error => {
    let errCode
    let msg
    let apiData
    if (!error) {
      // 未知错误，返回错误码 -99
      errCode = -99
      msg = '未知错误'
    } else if (axios.isCancel(error)) {
      // 请求被取消了，返回错误码 -1
      errCode = ErrorCode.HTTP_CANCEL
      msg = error.message
    } else if (!error.response) {
      // crash 导致的，返回错误码 -2
      errCode = -2
      msg = error
    } else if (!error.response.data) {
      // 没有获取到业务数据，返回 http 协议状态码及对应错误消息
      errCode = error.response.status
      msg = error.response.message
    } else {
      // 业务层报错，返回业务错误码及对应业务层错误消息
      const resData = error.response.data
      errCode = resData.status
      msg = resData.resMsg || resData.message || resData.msg
      apiData = resData.data
    }
    const newError = { code: errCode, msg, apiData }
    return Promise.reject(newError)
  },
}
