<script>
  import { ErrorCode, Http } from '@lstack/network'
  import {
    deepCopy,
    get,
    isArray,
    isEmpty,
    isEmptyText,
    isEqual,
    isFunction,
    isNotEmptyObject,
    isNotEmptyText,
    isObject,
    logError,
    removeAttrs,
  } from '@lstack/utils'

  const STATUS_WAITING = 'Waiting'
  const STATUS_SUCCEEDED = 'Succeeded'
  const STATUS_REQUESTING = 'Requesting'
  const STATUS_FAILED = 'Failed'
  const STATUS_CANCELED = 'Canceled'

  const REPEATED_REQUEST_CANCEL_OPPORTUNITY_BEFORE_REQUEST_VALID = 'BeforeRequestValid'
  const REPEATED_REQUEST_CANCEL_OPPORTUNITY_AFTER_REQUEST_VALID = 'AfterRequestValid'

  // TODO: 当 requestMethod 为 Get 时无需 watch 参数逻辑，取消非 Get 请求的 autoRequest 逻辑？by 吴斌
  export default {
    name: 'RlApiRequest',
    props: {
      autoCancelBeforeDestroy: { type: Boolean, default: true },
      autoCancelWhenRequestRepeated: { type: Boolean, default: true },
      repeatedRequestCancelOpportunity: {
        type: String,
        default: REPEATED_REQUEST_CANCEL_OPPORTUNITY_BEFORE_REQUEST_VALID,
        validator(val) {
          return (
            [
              REPEATED_REQUEST_CANCEL_OPPORTUNITY_BEFORE_REQUEST_VALID,
              REPEATED_REQUEST_CANCEL_OPPORTUNITY_AFTER_REQUEST_VALID,
            ].indexOf(val) !== -1
          )
        },
      },
      clearResponseAndErrorBeforeRequestWhenParametersChange: Boolean,
      // 该配置开启时会深度 watch 请求参数变化（含 body），因而建议只在 get 请求中使用。
      // 该配置优先级低于 cacheError 与 cacheResponse 俩参数。
      // 如非必要，在 post 类建议使用 cacheError 与 cacheResponse 达到相同的效果。
      autoCacheResponseWhenParametersNotChange: Boolean,
      autoCacheErrorWhenParametersNotChange: Boolean,
      autoRequestConfig: Object,
      // 以下配置优先级高于 autoRequestConfig 系列 api
      autoRequestQueryIgnoreKeys: Array,
      autoRequestPathsIgnoreKeys: Array,
      autoRequestBodyIgnoreKeys: Array,
      // 这是一个特殊的布尔值标记，当且仅当该标记变为 true 时会触发一次自动请求，并消耗该标记通过 update:autoRequestWatcherTag 将该标记重新置为 false。
      autoRequestWatcherTag: Boolean,
      requestApi: Function,
      requestMethod: String,
      requestUrl: String,
      requestConfig: Object,
      requestBody: Object,
      requestQuery: Object,
      requestPaths: Object,
      responseBizDataKey: { type: String, default: 'data' },
      // 拦截该请求，布尔类型或是返回布尔类型的函数
      // 一般请求都由开发者自行调用 request 方法发出，所以该参数的适用场景一般为 get 类请求由于请求参数变动触发的 autoRequest 模式
      interceptRequest: { type: [Boolean, Function], default: false },
      handleResponse: { type: [Boolean, Function], default: false },
      handleError: { type: [Boolean, Function], default: false },
      handleCancel: { type: [Boolean, Function], default: false },
      cacheError: { type: [Boolean, Function], default: undefined },
      // 初始值为 undefined 是为了判断用户是否主动传了参数，逻辑判断需要
      // 因为 Boolean 类型默认值会为 false，无法辨别该 false 是默认值还是用户传递
      cacheResponse: { type: [Boolean, Function], default: undefined },
    },
    data() {
      return {
        status: STATUS_WAITING,
        mRequestCancelHandle: {},
        mLastRequestId: 0,
        response: undefined,
        error: undefined,
        loading: false,
        rlApiRequestOutRenderName: 'rlApiRequestOutRender',
        mIsSameUrl: true,
        mIsSameQuery: true,
        mIsSamePaths: true,
        mIsSameBody: true,
      }
    },
    computed: {
      cAutoRequestWatcherTag: {
        set(val) {
          this.$emit('update:autoRequestWatcherTag', val)
        },
        get() {
          return this.autoRequestWatcherTag
        },
      },
      cUseRequestApi() {
        return isFunction(this.requestApi)
      },
      // 使用直接调用 Http.ajax 方式并且入参 requestUrl 为空时使用，子类需要重载并会返回（拼接好 paths 的） url
      iRequestUrl() {
        return undefined
      },
      aRequestUrl() {
        return undefined
      },
      cRequestUrl() {
        return this.requestUrl || this.iRequestUrl || this.aRequestUrl
      },
      iAutoRequestConfig() {
        return undefined
      },
      aAutoRequestConfig() {
        return {
          enable: true,
          query: { enable: false, ignoreKeys: ['searchKey', 'searchValue'], matchMode: 'Equal' }, // Equal, Same
          paths: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          url: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          body: { enable: false, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          // config: false,
        }
      },
      cAutoRequestConfig() {
        let enable
        const propEnable = get(this.autoRequestConfig, 'enable', undefined)
        if (propEnable !== undefined) {
          enable = propEnable
        } else {
          const interfaceEnable = get(this.iAutoRequestConfig, 'enable', undefined)
          enable = interfaceEnable !== undefined ? interfaceEnable : get(this.aAutoRequestConfig, 'enable')
        }

        const queryConfig = {
          ...get(this.aAutoRequestConfig, 'query'),
          ...get(this.iAutoRequestConfig, 'query'),
          ...get(this.autoRequestConfig, 'query'),
        }
        const pathsConfig = {
          ...get(this.aAutoRequestConfig, 'paths'),
          ...get(this.iAutoRequestConfig, 'paths'),
          ...get(this.autoRequestConfig, 'paths'),
        }
        const urlConfig = {
          ...get(this.aAutoRequestConfig, 'url'),
          ...get(this.iAutoRequestConfig, 'url'),
          ...get(this.autoRequestConfig, 'url'),
        }
        const bodyConfig = {
          ...get(this.aAutoRequestConfig, 'body'),
          ...get(this.iAutoRequestConfig, 'body'),
          ...get(this.autoRequestConfig, 'body'),
        }
        const configConfig = {
          ...get(this.aAutoRequestConfig, 'config'),
          ...get(this.iAutoRequestConfig, 'config'),
          ...get(this.autoRequestConfig, 'config'),
        }

        const { autoRequestQueryIgnoreKeys, autoRequestPathsIgnoreKeys, autoRequestBodyIgnoreKeys } = this
        if (isArray(autoRequestQueryIgnoreKeys)) {
          queryConfig.ignoreKeys = autoRequestQueryIgnoreKeys
        }
        if (isArray(autoRequestPathsIgnoreKeys)) {
          queryConfig.ignoreKeys = autoRequestPathsIgnoreKeys
        }
        if (isArray(autoRequestBodyIgnoreKeys)) {
          queryConfig.ignoreKeys = autoRequestBodyIgnoreKeys
        }

        return {
          enable,
          query: queryConfig,
          paths: pathsConfig,
          url: urlConfig,
          body: bodyConfig,
          config: configConfig,
        }
      },
      iRequestBody() {
        return undefined
      },
      aRequestBody() {
        return undefined
      },
      cRequestBody() {
        if (isObject(this.requestBody)) {
          return this.requestBody
        }
        return !isEmpty(this.iRequestBody) ? this.iRequestBody : this.aRequestBody
      },
      iRequestPaths() {
        return undefined
      },
      aRequestPaths() {
        return undefined
      },
      cRequestPaths() {
        return isObject(this.requestPaths)
          ? this.requestPaths
          : removeAttrs({ ...this.aRequestPaths, ...this.iRequestPaths }, [undefined], true)
      },
      iRequestQuery() {
        return undefined
      },
      aRequestQuery() {
        return undefined
      },
      cRequestQuery() {
        return isObject(this.requestQuery)
          ? this.requestQuery
          : removeAttrs({ ...this.aRequestQuery, ...this.iRequestQuery }, [undefined], true)
      },
      responseData() {
        return get(this.response, 'data')
      },
      responseBizData() {
        if (isEmpty(this.responseData)) return {}
        if (isEmptyText(this.responseBizDataKey)) return this.responseData

        return get(this.responseData, `${this.responseBizDataKey}`)
      },
      // 业务层作用域 API，区别于 aSlotScopeProps，权重占比高于后者。该属性被约定为仅限业务层被重载，而 aSlotScopeProps 约定为子类抽象层重载使用
      iSlotScopeProps() {
        return undefined
      },
      // 抽象层默认作用域插槽的回调参数钩子 computed 属性
      aSlotScopeProps() {
        return undefined
      },
      cSlotScopeProps() {
        const slotScopeDefault = {
          response: this.response,
          responseData: this.responseData,
          responseBizData: this.responseBizData,
          error: this.error,
          loading: this.loading,
          request: this.request,
          status: this.status,
        }
        return { ...slotScopeDefault, ...this.aSlotScopeProps, ...this.iSlotScopeProps }
      },
      isSameParameters() {
        return this.mIsSameQuery && this.mIsSameUrl && this.mIsSamePaths && this.mIsSameBody
      },
      cCacheError() {
        const { isSameParameters } = this
        if (this.cacheError !== undefined) {
          if (isFunction(this.cacheError)) {
            return this.cacheError(isSameParameters, this.autoCacheErrorWhenParametersNotChange)
          }
          return this.cacheError
        }
        // 如果用户不指定 cacheError 参数时，则默认逻辑为：如果配置 autoCacheErrorWhenParametersNotChange，则当有参数不变时，进行 Error 缓存，否则清除缓存数据
        // 暂不提供 aCacheError 和 iCacheError，后续看情况扩展
        return this.autoCacheErrorWhenParametersNotChange ? isSameParameters : false
      },
      cCacheResponse() {
        const { isSameParameters } = this
        if (this.cacheResponse !== undefined) {
          if (isFunction(this.cacheResponse)) {
            return this.cacheResponse(isSameParameters, this.autoCacheResponseWhenParametersNotChange)
          }
          return this.cacheResponse
        }
        // 如果用户不指定 cacheResponse 参数时，则默认逻辑为：如果配置 autoCacheResponseWhenParametersNotChange，则当有参数不变时，进行 Response 缓存，否则清除缓存数据
        // 暂不提供 aCacheResponse 和 iCacheResponse，后续看情况扩展
        return this.autoCacheResponseWhenParametersNotChange ? isSameParameters : false
      },
    },
    watch: {
      loading: {
        immediate: true,
        handler(newVal) {
          this.$emit('update:loading', newVal)
        },
      },
      cAutoRequestWatcherTag: {
        handler(needRequest) {
          if (needRequest) {
            this.request()
            this.cAutoRequestWatcherTag = false
          }
        },
      },
      cRequestUrl: {
        immediate: true,
        handler(newVal, oldVal) {
          if (
            this.autoCacheErrorWhenParametersNotChange ||
            this.autoCacheResponseWhenParametersNotChange ||
            this.clearResponseAndErrorBeforeRequestWhenParametersChange
          ) {
            this.mIsSameUrl = isEqual(newVal, oldVal)
          }
          if (this.cAutoRequestConfig.enable && this.needAutoRequest(newVal, oldVal, this.cAutoRequestConfig.url)) {
            this.request()
          }
        },
      },
      cRequestQuery: {
        deep: true,
        immediate: true,
        handler(newVal, oldVal) {
          if (
            this.autoCacheErrorWhenParametersNotChange ||
            this.autoCacheResponseWhenParametersNotChange ||
            this.clearResponseAndErrorBeforeRequestWhenParametersChange
          ) {
            this.mIsSameQuery = isEqual(newVal, oldVal)
          }
          if (this.cAutoRequestConfig.enable && this.needAutoRequest(newVal, oldVal, this.cAutoRequestConfig.query)) {
            this.request()
          }
        },
      },
      cRequestPaths: {
        deep: true,
        immediate: true,
        handler(newVal, oldVal) {
          if (
            this.autoCacheErrorWhenParametersNotChange ||
            this.autoCacheResponseWhenParametersNotChange ||
            this.clearResponseAndErrorBeforeRequestWhenParametersChange
          ) {
            this.mIsSamePaths = isEqual(newVal, oldVal)
          }
          if (this.cAutoRequestConfig.enable && this.needAutoRequest(newVal, oldVal, this.cAutoRequestConfig.paths)) {
            this.request()
          }
        },
      },
      cRequestBody: {
        deep: true,
        immediate: true,
        handler(newVal, oldVal) {
          if (
            this.autoCacheErrorWhenParametersNotChange ||
            this.autoCacheResponseWhenParametersNotChange ||
            this.clearResponseAndErrorBeforeRequestWhenParametersChange
          ) {
            this.mIsSameBody = isEqual(newVal, oldVal)
          }
          if (this.cAutoRequestConfig.enable && this.needAutoRequest(newVal, oldVal, this.cAutoRequestConfig.body)) {
            this.request()
          }
        },
      },
      response: {
        handler(newVal, oldVal) {
          this.cOnResponseChange(newVal, oldVal)
        },
      },
      error: {
        handler(newVal, oldVal) {
          this.cOnErrorChange(newVal, oldVal)
        },
      },
    },
    beforeDestroy() {
      if (this.autoCancelBeforeDestroy) {
        this.cancelRequest('组件销毁,请求取消')
      }
    },
    methods: {
      clearResult() {
        this.response = undefined
        this.error = undefined
      },
      needAutoRequest(newVal, oldVal, config = {}) {
        const { enable, ignoreKeys, matchMode } = config
        if (!enable) return false
        if (matchMode === 'Same') return newVal !== oldVal
        if (matchMode === 'Equal') {
          if (isArray(ignoreKeys) && isObject(newVal) && isObject(oldVal)) {
            const newValCopy = deepCopy(newVal)
            const oldValCopy = deepCopy(oldVal)
            ignoreKeys.forEach(key => {
              if (newValCopy) {
                delete newValCopy[key]
              }
              if (oldValCopy) {
                delete oldValCopy[key]
              }
            })
            return !isEqual(newValCopy, oldValCopy)
          }
          return true
        }
        return false
      },
      mRecombineRequestConfig() {
        const sourceConfig = isObject(this.requestConfig) ? this.requestConfig : {}
        const requestId = sourceConfig.requestId ? sourceConfig.requestId : new Date().getTime()
        const requestCancelHandle = isObject(sourceConfig.cancelHandle)
          ? sourceConfig.cancelHandle
          : this.mRequestCancelHandle
        return { ...sourceConfig, requestId, cancelHandle: requestCancelHandle }
      },
      cancelRequest(reason) {
        if (isObject(this.mRequestCancelHandle) && isFunction(this.mRequestCancelHandle.cancel)) {
          this.mRequestCancelHandle.cancel(reason)
          this.mRequestCancelHandle.cancel = null
        }
      },
      iBeforeRequest() {},
      aBeforeRequest() {},
      cBeforeRequest() {
        this.iBeforeRequest()
        this.aBeforeRequest()
      },
      iRequestPathsValid() {
        return true
      },
      aRequestPathsValid() {
        return true
      },
      cRequestPathsValid() {
        return this.iRequestPathsValid() && this.aRequestPathsValid()
      },
      iRequestQueryValid() {
        return true
      },
      aRequestQueryValid() {
        return true
      },
      cRequestQueryValid() {
        return this.iRequestQueryValid() && this.aRequestQueryValid()
      },
      iRequestUrlValid() {
        return true
      },
      aRequestUrlValid() {
        return isNotEmptyText(this.cRequestUrl)
      },
      cRequestUrlValid() {
        return this.iRequestUrlValid() && this.aRequestUrlValid()
      },
      iRequestBodyValid() {
        return true
      },
      aRequestBodyValid() {
        return true
      },
      cRequestBodyValid() {
        return this.iRequestBodyValid() && this.aRequestBodyValid()
      },
      mValidBeforeRequest() {
        if (this.cUseRequestApi) {
          return this.cRequestPathsValid() && this.cRequestQueryValid() && this.cRequestBodyValid()
        }
        return this.cRequestUrlValid() && this.cRequestQueryValid() && this.cRequestBodyValid()
      },
      request() {
        return new Promise((resolve, reject) => {
          this.cBeforeRequest()
          if (this.cInterceptRequest()) {
            return
          }
          if (this.repeatedRequestCancelOpportunity === REPEATED_REQUEST_CANCEL_OPPORTUNITY_BEFORE_REQUEST_VALID) {
            if (this.autoCancelWhenRequestRepeated) {
              this.cancelRequest('重复请求,请求取消')
            }
          }
          if (this.mValidBeforeRequest()) {
            if (this.repeatedRequestCancelOpportunity === REPEATED_REQUEST_CANCEL_OPPORTUNITY_AFTER_REQUEST_VALID) {
              if (this.autoCancelWhenRequestRepeated) {
                this.cancelRequest('重复请求,请求取消')
              }
            }
            if (this.clearResponseAndErrorBeforeRequestWhenParametersChange && !this.isSameParameters) {
              this.response = undefined
              this.error = undefined
            }
            this.loading = true
            this.status = STATUS_REQUESTING
            this.mInvokeRequest()
              .then(response => {
                this.loading = false
                this.mRequestCancelHandle.cancel = null
                this.response = response
                this.status = STATUS_SUCCEEDED
                if (!this.cCacheError) {
                  this.error = undefined
                }
                if (!this.cHandleResponse(response, this.responseData, this.responseBizData)) {
                  resolve(response)
                }
                this.mIsSameUrl = true
                this.mIsSameQuery = true
                this.mIsSamePaths = true
                this.mIsSameBody = true
              })
              .catch(error => {
                if (error.code !== ErrorCode.HTTP_CANCEL) {
                  this.loading = false
                  this.mRequestCancelHandle.cancel = null
                  this.error = error
                  this.status = STATUS_FAILED
                  if (!this.cCacheResponse) {
                    this.response = undefined
                  }
                  if (!this.cHandleError(error)) {
                    reject(error)
                  }
                  this.mIsSameUrl = true
                  this.mIsSameQuery = true
                  this.mIsSamePaths = true
                  this.mIsSameBody = true
                } else {
                  this.cHandleCancel(error)
                  if (this.mLastRequestId === error.requestId) {
                    this.loading = false
                    this.status = STATUS_CANCELED
                  }
                }
              })
          } else {
            if (!this.cCacheResponse) {
              this.response = undefined
            }
            if (!this.cCacheError) {
              this.error = undefined
            }
          }
        }).catch(e => {
          logError(e)
        })
      },
      mInvokeRequest() {
        const requestConfig = this.mRecombineRequestConfig()
        this.mLastRequestId = requestConfig.requestId
        this.mRequestCancelHandle = requestConfig.cancelHandle

        return this.cUseRequestApi
          ? this.requestApi(
              { paths: this.cRequestPaths, query: this.cRequestQuery, body: this.cRequestBody },
              requestConfig
            )
          : Http.ajax(
              this.cRequestUrl,
              this.requestMethod,
              { query: this.cRequestQuery, body: this.cRequestBody },
              requestConfig
            )
      },
      /**
       * 这里是对业务层请求成功响应处理的接口定义，返回值为是否对处理进行消耗，默认返回 false。
       * @param response 请求的原始响应数据的回调参数，含有接口的 config 信息
       * @param responseData 请求的 data 数据的回调参数，即 response.data
       * @param responseBizData 请求的业务层数据对象的回调参数，即 response.data[responseBizDataKey}
       * @returns {boolean} 是否对 response 处理进行消耗拦截
       */
      iHandleResponse(response, responseData, responseBizData) {
        return false
      },
      /**
       * 这里是对抽象层请求成功响应处理的接口定义，返回值为是否对处理进行消耗，默认返回 false。
       * @param response 请求的原始响应数据的回调参数，含有接口的 config 信息
       * @param responseData 请求的 data 数据的回调参数，即 response.data
       * @param responseBizData 请求的业务层数据对象的回调参数，即 response.data[responseBizDataKey}
       * @returns {boolean} 是否对 response 处理进行消耗拦截
       */
      aHandleResponse(response, responseData, responseBizData) {
        return false
      },
      cHandleResponse(response, responseData, responseBizData) {
        return (
          (!isFunction(this.handleResponse) && this.handleResponse) ||
          (isFunction(this.handleResponse) && this.handleResponse(response, responseData, responseBizData)) ||
          this.iHandleResponse(response, responseData, responseBizData) ||
          this.aHandleResponse(response, responseData, responseBizData)
        )
      },
      iHandleError(error) {
        return false
      },
      aHandleError(error) {
        if (isNotEmptyText(error)) {
          this.$message.error(error)
        } else if (isNotEmptyObject(error) && isNotEmptyText(error.msg)) {
          this.$message.error(error.msg)
        } else {
          logError(error)
          this.$message.error('网络请求失败，但没有具体错误信息')
        }
        return false
      },
      cHandleError(error) {
        return (
          (!isFunction(this.handleError) && this.handleError) ||
          (isFunction(this.handleError) && this.handleError(error)) ||
          this.iHandleError(error) ||
          this.aHandleError(error)
        )
      },
      iHandleCancel(error) {},
      aHandleCancel(error) {},
      cHandleCancel(error) {
        return (
          (!isFunction(this.handleCancel) && this.handleCancel) ||
          (isFunction(this.handleCancel) && this.handleCancel(error)) ||
          this.iHandleCancel(error) ||
          this.aHandleCancel(error)
        )
      },
      iInterceptRequest() {
        return false
      },
      aInterceptRequest() {
        return false
      },
      cInterceptRequest() {
        return (
          (isFunction(this.interceptRequest) && this.interceptRequest()) ||
          (!isFunction(this.interceptRequest) && this.interceptRequest) ||
          this.iInterceptRequest() ||
          this.aInterceptRequest()
        )
      },

      /**
       * 当 response 变化时触发的回调，通过非 deep 的 watch 触发，会先后执行业务实现层和抽象层的实现
       * @param newVal 变化后的 response 值
       * @param oldVal 变化前的 response 值
       */
      cOnResponseChange(newVal, oldVal) {
        this.aOnResponseChange(newVal, oldVal)
        this.iOnResponseChange(newVal, oldVal)
      },
      aOnResponseChange(newVal, oldVal) {},
      iOnResponseChange(newVal, oldVal) {},

      /**
       * 当 error 变化时触发的回调，通过非 deep 的 watch 触发，会先后执行业务实现层和抽象层的实现
       * @param newVal 变化后的 error 值
       * @param oldVal 变化前的 error 值
       */
      cOnErrorChange(newVal, oldVal) {
        this.aOnErrorChange()
        this.iOnErrorChange()
      },
      aOnErrorChange(newVal, oldVal) {},
      iOnErrorChange(newVal, oldVal) {},
      rlApiRequestOutRender(createElement, sourceProps) {
        if (this.$scopedSlots.default) {
          return this.$scopedSlots.default(sourceProps)
        }
        return undefined
      },
    },
    render(createElement) {
      return this[this.rlApiRequestOutRenderName](createElement, this.cSlotScopeProps)
    },
  }
</script>
