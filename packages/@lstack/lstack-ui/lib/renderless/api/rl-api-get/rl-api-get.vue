<script>
  import { isObject } from '@lstack/utils'
  import RlApiRequest from '../rl-api-request'

  export default {
    name: 'RlApiGet',
    extends: RlApiRequest,
    props: {
      requestMethod: {
        type: String,
        default: 'GET',
        validator(val) {
          return ['GET', 'Get', 'get'].indexOf(val) !== -1
        },
      },
      autoCancelBeforeDestroy: { type: Boolean, default: true },
      autoCancelWhenRepeated: { type: Boolean, default: true },
    },
    computed: {
      aKvMap() {
        return undefined
      },
      iKvMap() {
        return undefined
      },
      cKvMap() {
        return { ...this.aKvMap, ...this.iKvMap }
      },
      aAutoRequestConfig() {
        return {
          enable: true,
          query: { enable: true, ignoreKeys: ['searchKey', 'searchValue'], matchMode: 'Equal' }, // Equal, Same
          paths: { enable: true, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          url: { enable: true, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          body: { enable: true, ignoreKeys: [], matchMode: 'Equal' }, // Equal, Same
          // config: false,
        }
      },
      aSlotScopeProps() {
        return {
          refresh: this.refresh,
          kvMap: this.cKvMap,
          formatApi: this.cFormatApi,
          ...this.aSlotScopeProps_get,
        }
      },
      aSlotScopeProps_get() {
        return undefined
      },
    },
    methods: {
      refresh() {
        return this.request()
      },
      /**
       * 抽象层的 formatApi 的实现
       * @param source 待格式化的原始对象
       * @returns
       */
      aFormatApi(source) {
        return source
      },
      iFormatApi(source) {
        return source
      },
      cFormatApi(source) {
        const iFormat = this.iFormatApi(source)
        if (isObject(iFormat)) {
          return iFormat
        }
        return this.aFormatApi(source)
      },
    },
  }
</script>
