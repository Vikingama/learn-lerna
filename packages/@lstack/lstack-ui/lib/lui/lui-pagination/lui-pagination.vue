<template>
  <div :class="{ hidden: hidden }" class="lui-pagination">
    <el-pagination
      :background="background"
      :current-page.sync="cPage"
      :page-size.sync="cPageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import { scrollTo, isArray } from '@lstack/utils'

  export default {
    name: 'LuiPagination',
    props: {
      total: Number,
      background: Boolean,
      page: Number,
      pageSize: Number,
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        },
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper',
      },
      autoScroll: {
        type: Boolean,
        default: true,
      },
      hidden: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
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
    watch: {
      pageSizes: {
        immediate: true,
        handler(val) {
          if (isArray(val) && val.length > 0 && val.indexOf(this.cPageSize) === -1) {
            this.cPageSize = val[0]
          }
        },
      },
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('pagination', { page: this.cPage, pageSize: val })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      },
      handleCurrentChange(val) {
        this.$emit('pagination', { page: val, pageSize: this.cPageSize })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      },
    },
  }
</script>

<style lang="scss">
  .lui-pagination.hidden {
    display: none;
  }
</style>
