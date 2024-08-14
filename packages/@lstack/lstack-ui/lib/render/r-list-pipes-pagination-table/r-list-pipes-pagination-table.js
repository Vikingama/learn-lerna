import { isObject, logError } from '@lstack/utils'
import PaginationTable from '../../compound/pagination-table'

export default {
  name: 'RListPipesPaginationTable',
  props: {
    kvMap: Object,
    keys: Array,
    border: Boolean,
    hidePaginationOnSinglePage: Boolean,
    paginationLayout: String,
    pageSizes: Array,
  },
  data() {
    return {
      paginationTableOutRenderName: 'paginationTableOutRender',
    }
  },
  computed: {
    renderProps() {
      logError('请重载该方法')
      return {
        page: undefined,
        pageSize: undefined,
        listTotal: undefined,
        enableListPagination: undefined,
      }
    },
    renderListeners() {
      logError('请重载该方法')
      return {
        'update:page': undefined,
        'update:pageSize': undefined,
      }
    },
  },
  methods: {
    paginationTableOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
    paginationTableInRender(createElement, sourceProps) {
      let cTotal
      if (sourceProps.enablePipeLoadmore) {
        cTotal = this.renderProps.listTotal
      } else if (sourceProps.enablePipePagination) {
        cTotal = sourceProps.total
      } else {
        cTotal = this.renderProps.listTotal
      }
      return createElement(PaginationTable, {
        props: {
          ...this.$attrs,
          ...this.$props,
          ...this.renderProps,
          kvMap: isObject(this.kvMap) ? this.kvMap : sourceProps.kvMap,
          data: sourceProps.pipeList,
          total: cTotal,
          isMaxPage: sourceProps.isMaxPage,
          isLoadError: sourceProps.isLoadError,
          enableLoadmore: sourceProps.enablePipeLoadmore,
          loadmoreApi: sourceProps.nextPage,
          reloadApi: sourceProps.refresh,
          loading: sourceProps.loading,
          disablePagination:
            sourceProps.enablePipeLoadmore ||
            (!this.renderProps.enableListPagination && !sourceProps.enablePipePagination),
        },
        scopedSlots: {
          ...this.$scopedSlots,
          default: props => this[this.paginationTableOutRenderName](createElement, { ...sourceProps, ...props }),
        },
        attrs: this.$attrs,
        on: {
          ...this.$listeners,
          ...this.renderListeners,
        },
      })
    },
  },
}
