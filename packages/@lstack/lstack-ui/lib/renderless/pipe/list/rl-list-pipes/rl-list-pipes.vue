<script>
  import { isFunction } from '@lstack/utils'
  import RlListPipeFilter from '../rl-list-pipe-filter'
  import RlListPipeFormat from '../rl-list-pipe-format'
  import RlListPipePagination from '../rl-list-pipe-pagination'
  import RlListPipePlaceholder from '../rl-list-pipe-placeholder'
  import RlListPipeLoadmore from '../rl-list-pipe-loadmore'
  import RlListPipePick from '../rl-list-pipe-pick'

  export default {
    name: 'RlListPipes',
    props: {
      list: Array,
      needClone: Boolean,

      enablePipeFormat: { type: Boolean, default: true },
      formatApi: Function,
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
      }
    },
    computed: {
      defaultScopeSlotProps() {
        return {
          enablePipeFormat: this.enablePipeFormat,
          enablePipeLoadmore: this.enablePipeLoadmore,
          enablePipeFilter: this.enablePipeFilter,
          enablePipePick: this.enablePipePick,
          enablePipePagination: this.enablePipePagination,
          enablePipePlaceholder: this.enablePipePlaceholder,
        }
      },
    },
    methods: {
      renderRlListPipePlaceholder(createElement, sourceProps) {
        return createElement(RlListPipePlaceholder, {
          props: {
            list: sourceProps.pipeList,
            listPlaceholder: this.listPlaceholder,
            listPlacedApi: this.listPlacedApi,
            disable: !this.enablePipePlaceholder,
          },
          scopedSlots: {
            default: props => {
              const resultProps = {
                ...sourceProps,
                pipeList: props.placedList,
              }
              return this[this.rlListPipesOutRenderName](createElement, resultProps)
            },
          },
          on: this.$listeners,
        })
      },
      renderRlListPipePagination(createElement, sourceProps) {
        return createElement(RlListPipePagination, {
          props: {
            list: sourceProps.pipeList,
            page: this.page,
            pageSize: this.pageSize,
            needClone: this.needClone,
            disable: !this.enablePipePagination,
          },
          scopedSlots: {
            default: props => {
              const resultProps = { ...sourceProps, ...props, pipeList: props.paginatedList }
              if (this.enablePipePlaceholder) {
                return this.renderRlListPipePlaceholder(createElement, resultProps)
              }
              return this[this.rlListPipesOutRenderName](createElement, resultProps)
            },
          },
          on: this.$listeners,
        })
      },
      renderRlListPipeFilter(createElement, sourceProps) {
        return createElement(RlListPipeFilter, {
          props: {
            list: sourceProps.pipeList,
            needClone: this.needClone,
            expressions: this.expressions,
            query: this.query,
            searchKey: this.searchKey,
            searchValue: this.searchValue,
            disable: !this.enablePipeFilter,
            expressionMatchMode: this.expressionMatchMode,
            disableQueryTransform: this.disableQueryTransform,
            attrsTransformApi: this.attrsTransformApi,
          },
          scopedSlots: {
            default: props => {
              const resultProps = { ...sourceProps, ...props, pipeList: props.filteredList }
              if (this.enablePipePick) {
                return this.renderRlListPipePick(createElement, resultProps)
              }
              if (this.enablePipePagination) {
                return this.renderRlListPipePagination(createElement, resultProps)
              }
              if (this.enablePipePlaceholder) {
                return this.renderRlListPipePlaceholder(createElement, resultProps)
              }
              return this[this.rlListPipesOutRenderName](createElement, resultProps)
            },
          },
          attrs: this.$attrs,
          on: this.$listeners,
        })
      },
      renderRlListPipePick(createElement, sourceProps) {
        return createElement(RlListPipePick, {
          props: {
            list: sourceProps.pipeList,
            needClone: this.needClone,
            expressions: this.expressions,
            query: this.query,
            searchKey: this.searchKey,
            searchValue: this.searchValue,
            disable: !this.enablePipePick,
            expressionMatchMode: this.expressionMatchMode,
            disableQueryTransform: this.disableQueryTransform,
            attrsTransformApi: this.attrsTransformApi,
          },
          scopedSlots: {
            default: props => {
              const resultProps = { ...sourceProps, ...props, pipeList: props.pickedList }
              if (this.enablePipePagination) {
                return this.renderRlListPipePagination(createElement, resultProps)
              }
              if (this.enablePipePlaceholder) {
                return this.renderRlListPipePlaceholder(createElement, resultProps)
              }
              return this[this.rlListPipesOutRenderName](createElement, resultProps)
            },
          },
          attrs: this.$attrs,
          on: this.$listeners,
        })
      },
      renderRlListPipeLoadmore(createElement, sourceProps) {
        return createElement(RlListPipeLoadmore, {
          props: {
            list: sourceProps.pipeList,
            page: this.page,
            pageSize: this.pageSize,
            total: this.total,
          },
          scopedSlots: {
            default: props => {
              const resultProps = { ...sourceProps, ...props, pipeList: props.loadedList }
              if (this.enablePipeFilter) {
                return this.renderRlListPipeFilter(createElement, resultProps)
              }
              if (this.enablePipePick) {
                return this.renderRlListPipePick(createElement, resultProps)
              }
              if (this.enablePipePagination) {
                return this.renderRlListPipePagination(createElement, resultProps)
              }
              if (this.enablePipePlaceholder) {
                return this.renderRlListPipePlaceholder(createElement, resultProps)
              }
              return this[this.rlListPipesOutRenderName](createElement, resultProps)
            },
          },
          attrs: this.$attrs,
          on: {
            ...this.$listeners,
            'update:page': page => {
              this.$emit('update:page', page)
            },
            'update:pageSize': pageSize => {
              this.$emit('update:pageSize', pageSize)
            },
          },
        })
      },
      renderRlListPipeFormat(createElement, sourceProps) {
        return createElement(RlListPipeFormat, {
          props: {
            list: sourceProps.pipeList,
            formatApi: this.formatApi,
            processApi: this.processApi,
            disable: !this.enablePipeFormat,
          },
          scopedSlots: {
            default: props => {
              const resultProps = { ...sourceProps, ...props, pipeList: props.formattedList }
              if (this.enablePipeLoadmore) {
                return this.renderRlListPipeLoadmore(createElement, resultProps)
              }
              if (this.enablePipeFilter) {
                return this.renderRlListPipeFilter(createElement, resultProps)
              }
              if (this.enablePipePick) {
                return this.renderRlListPipePick(createElement, resultProps)
              }
              if (this.enablePipePagination) {
                return this.renderRlListPipePagination(createElement, resultProps)
              }
              if (this.enablePipePlaceholder) {
                return this.renderRlListPipePlaceholder(createElement, resultProps)
              }
              return this[this.rlListPipesOutRenderName](createElement, resultProps)
            },
          },
          on: this.$listeners,
        })
      },
      renderPipes(createElement) {
        const resultProps = { ...this.defaultScopeSlotProps, pipeList: this.list }
        if (this.enablePipeFormat) {
          return this.renderRlListPipeFormat(createElement, resultProps)
        }
        if (this.enablePipeLoadmore) {
          return this.renderRlListPipeLoadmore(createElement, resultProps)
        }
        if (this.enablePipeFilter) {
          return this.renderRlListPipeFilter(createElement, resultProps)
        }
        if (this.enablePipePick) {
          return this.renderRlListPipePick(createElement, resultProps)
        }
        if (this.enablePipePagination) {
          return this.renderRlListPipePagination(createElement, resultProps)
        }
        if (this.enablePipePlaceholder) {
          return this.renderRlListPipePlaceholder(createElement, resultProps)
        }
        return this[this.rlListPipesOutRenderName](createElement, resultProps)
      },
      rlListPipesOutRender(createElement, sourceProps) {
        if (this.$scopedSlots.default) {
          return this.$scopedSlots.default(sourceProps)
        }
        return undefined
      },
    },
    render(createElement) {
      return this.renderPipes(createElement)
    },
  }
</script>
