<script>
  import { get, isNotEmptyText, isObject } from '@lstack/utils'
  import RlApiGet from '../rl-api-get'

  export default {
    name: 'RlApiList',
    extends: RlApiGet,
    props: {
      apiPage: Number,
      apiPageSize: Number,
      enableListPagination: Boolean,
      listKeyInResponseBizData: { type: String, default: 'items' },
      listTotalKeyInResponseBizData: { type: String, default: 'total' },
      listPageKeyInResponseBizData: { type: String, default: 'page' },
      listPageSizeKeyInResponseBizData: { type: String, default: 'pageSize' },
    },
    data() {
      return {
        mPage: 1,
        mPageSize: 10,
      }
    },
    computed: {
      cPage: {
        get() {
          if (isObject(this.requestQuery)) {
            return this.requestQuery.page
          }
          if (isNotEmptyText(this.apiPage)) {
            return this.apiPage
          }
          if (isNotEmptyText(this.page)) {
            return this.page
          }
          return this.mPage
        },
        set(val) {
          if (isObject(this.requestQuery)) {
            this.requestQuery.page = val
          }
          this.mPage = val
          this.$emit('update:apiPage', val)
          this.$emit('update:page', val)
        },
      },
      cPageSize: {
        get() {
          if (isObject(this.requestQuery)) {
            return this.requestQuery.pageSize
          }
          if (isNotEmptyText(this.apiPageSize)) {
            return this.apiPageSize
          }
          if (isNotEmptyText(this.pageSize)) {
            return this.pageSize
          }
          return this.mPageSize
        },
        set(val) {
          if (isObject(this.requestQuery)) {
            this.requestQuery.pageSize = val
          }
          this.mPageSize = val
          this.$emit('update:apiPageSize', val)
          this.$emit('update:pageSize', val)
        },
      },
      aRequestQuery_list() {
        return undefined
      },
      aRequestQuery() {
        return {
          page: this.enableListPagination ? this.cPage : undefined,
          pageSize: this.enableListPagination ? this.cPageSize : undefined,
          ...this.aRequestQuery_list,
        }
      },
      list() {
        if (isNotEmptyText(this.listKeyInResponseBizData)) {
          return get(this.responseBizData, this.listKeyInResponseBizData)
        }
        return this.responseBizData
      },
      listTotal() {
        return get(this.responseBizData, this.listTotalKeyInResponseBizData)
      },
      listPage() {
        return get(this.responseBizData, this.listPageKeyInResponseBizData) || this.cPage
      },
      listPageSize() {
        return get(this.responseBizData, this.listPageSizeKeyInResponseBizData) || this.cPageSize
      },
      aSlotScopeProps_get() {
        return {
          list: this.list,
          listTotal: this.listTotal,
          listPage: this.listPage,
          listPageSize: this.listPageSize,
          page: this.cPage,
          pageSize: this.cPageSize,
          enableListPagination: this.enableListPagination,
        }
      },
    },
    methods: {
      /**
       * 抽象层对 onResponseChange 的实现，这里主要获取了 list 和 listTotal 数据并通过 update 事件对外发布
       * @param newVal 新的 response 对象
       * @param oldVal 老的 response 对象
       */
      aOnResponseChange(newVal, oldVal) {
        this.$emit('update', this.list, this.listTotal)
      },
    },
  }
</script>
