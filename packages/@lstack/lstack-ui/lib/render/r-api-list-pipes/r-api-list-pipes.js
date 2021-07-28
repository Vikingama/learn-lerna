import { logError } from '@lstack/utils'
import RlListPipes from '../../renderless/pipe/list/rl-list-pipes'

export default {
  name: 'RApiListPipes',
  props: {
    needClone: Boolean,
    enablePipeFormat: { type: Boolean, default: true },
    processApi: Function,

    enablePipeLoadmore: Boolean,
    page: Number,
    pageSize: Number,
    total: Number,

    enablePipeFilter: Boolean,

    enablePipePick: Boolean,
    expressions: [Array, Object],
    query: Object,
    searchKey: String,
    searchValue: String,
    expressionMatchMode: String,
    disableQueryTransform: Boolean,
    attrsTransformApi: Function,

    enablePipePagination: Boolean,
    // page: Number,
    // pageSize: Number,

    enablePipePlaceholder: Boolean,
    listPlaceholder: { default: undefined },
    listPlacedApi: Function,
  },
  data() {
    return {
      rlListPipesOutRenderName: 'rlListPipesOutRender',
      rlApiRequestOutRenderName: 'rlListPipesInRender',
    }
  },
  computed: {
    renderProps() {
      logError('请重载该方法')
      return { enableListPagination: undefined }
    },
  },
  methods: {
    rlListPipesInRender(createElement, sourceProps) {
      return createElement(RlListPipes, {
        props: {
          ...this.$attrs,
          ...this.$props,
          list: sourceProps.list,
          formatApi: sourceProps.formatApi,
          kvMap: sourceProps.kvMap,
          page: this.cPage,
          pageSize: this.cPageSize,
          total: sourceProps.listTotal,
        },
        scopedSlots: {
          default: props => {
            const resultProps = { ...this.cSlotScopeProps, ...props }
            return this[this.rlListPipesOutRenderName](createElement, resultProps)
          },
        },
        attrs: this.$attrs,
        on: {
          ...this.$listeners,
          'update:page': this.updatePage,
          'update:pageSize': this.updatePageSize,
        },
      })
    },
    rlListPipesOutRender(createElement, sourceProps) {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(sourceProps)
      }
      return undefined
    },
    updatePage(page) {
      this.cPage = page
    },
    updatePageSize(pageSize) {
      this.cPageSize = pageSize
    },
  },
}
