<template>
  <div class="pagination-table">
    <lui-table
      :loading="!enableLoadmore && loading"
      class="pagination-table__table"
      border
      :keys="keys"
      :kv-map="kvMap"
      :data="data"
      v-bind="$attrs"
      @selection-change="selection => $emit('selection-change', selection)"
    >
      <template #append>
        <template v-if="enableLoadmore">
          <slot v-if="$scopedSlots.loadmoreView" name="loadmoreView"></slot>
          <lui-loadmore-view
            v-else
            :loading="loading"
            :is-max-page="isMaxPage"
            :is-load-error="isLoadError"
            :reload-api="reloadApi"
            :loadmore-api="loadmoreApi"
          />
        </template>
      </template>
      <slot></slot>
      <template #empty>
        <slot name="empty" />
      </template>
    </lui-table>
    <lui-pagination
      v-if="!enableLoadmore && !disablePagination"
      class="pagination-table__pagination"
      :page.sync="cPage"
      :page-size.sync="cPageSize"
      :page-sizes="pageSizes"
      :layout="paginationLayout"
      :total="total"
      :hidden="hidePaginationOnSinglePage && total <= minPageSize"
      @pagination="dispatchPagination"
    ></lui-pagination>
  </div>
</template>

<script>
  import { isNotEmptyArray, isNotEmptyObject } from '@lstack/utils'
  import LuiPagination from '../../lui/lui-pagination'
  import LuiTable from '../../lui/lui-table'
  import LuiLoadmoreView from '../../lui/lui-loadmore-view'

  export default {
    name: 'PaginationTable',
    components: { LuiPagination, LuiTable, LuiLoadmoreView },
    props: {
      kvMap: Object,
      keys: Array,
      loading: Boolean,
      border: Boolean,
      data: Array,
      disablePagination: Boolean,
      hidePaginationOnSinglePage: Boolean,
      total: Number,
      paginationLayout: String,
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        },
      },
      page: Number,
      pageSize: Number,
      enableLoadmore: Boolean,
      isMaxPage: Boolean,
      isLoadError: Boolean,
      reloadApi: Function,
      loadmoreApi: Function,
    },
    data() {
      return {}
    },
    computed: {
      minPageSize() {
        // TODO: 需要改为选取最小的，而不是直接选第一个 by 吴斌
        return isNotEmptyArray(this.pageSizes) ? this.pageSizes[0] : 10
      },
      cPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        },
      },
      cPageSize: {
        get() {
          return this.pageSize
        },
        set(val) {
          this.$emit('update:pageSize', val)
        },
      },
    },
    methods: {
      reset() {
        this.cPage = 1
        this.cPageSize = 10
      },
      resetPageSize() {
        this.cPageSize = 10
      },
      resetPage() {
        this.cPage = 1
      },
      dispatchPagination(paginationData) {
        if (isNotEmptyObject(paginationData)) return
        this.cPage = paginationData.page
        this.cPageSize = paginationData.pageSize
        // 解决当切换pageSize大小时,当前页数过大会导致该事件回调2次(第一次为异常数据)的问题
        if (paginationData.pageSize <= 0) return
        const maxPage = Math.ceil(this.total / paginationData.pageSize)
        if (paginationData.page > maxPage) {
          return
        }
        this.$emit('pagination', paginationData)
      },
    },
  }
</script>

<style lang="scss">
  @import './pagination-table.var';

  .pagination-table {
    position: relative;
  }
  .pagination-table__pagination {
    position: relative;
    margin-top: $pagination-table-pagination--margin-top;
  }
</style>
