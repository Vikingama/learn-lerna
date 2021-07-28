<template>
  <lui-dialog class="lui-table-dialog" :title="title">
    <template v-if="$scopedSlots.beforeBody" #beforeBody>
      <slot name="beforeBody"></slot>
    </template>
    <slot name="beforeTable"></slot>
    <slot name="table">
      <pipe-pagination-table :list="list" :kv-map="kvMap" v-bind="$attrs">
        <slot></slot>
      </pipe-pagination-table>
    </slot>
    <slot name="afterTable"></slot>
    <template v-if="$scopedSlots.afterBody" #afterBody>
      <slot name="afterBody"></slot>
    </template>
    <template v-if="$scopedSlots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </lui-dialog>
</template>

<script>
  import LuiDialog from '../lui-dialog'
  import PipePaginationTable from '../../compound/pipe-pagination-table'

  export default {
    name: 'LuiTableDialog',
    components: { LuiDialog, PipePaginationTable },
    props: {
      title: String,
      kvMap: Object,
      list: Array,
    },
  }
</script>

<!--<style lang="scss" scoped>-->
<!--  @import '~@/styles/variables.scss';-->

<!--  .lsh-dialog {-->
<!--    width: 50%;-->
<!--    /*min-height: 50%;*/-->
<!--    /*max-height: 80%;*/-->
<!--    /*position: relative;*/-->
<!--    background: $color-background;-->
<!--    border-radius: $border-radius-small;-->
<!--    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);-->
<!--    box-sizing: border-box;-->
<!--    position: absolute;-->
<!--    top: 0;-->
<!--    margin-top: 20vh;-->

<!--    .lsh-dialog__header {-->
<!--      position: relative;-->
<!--      height: $space-48px;-->
<!--      line-height: $space-48px;-->
<!--      padding: 0 $space-16px;-->

<!--      .el-dialog__title {-->
<!--        line-height: $font-line-height-h2;-->
<!--        font-size: $font-size-h2;-->
<!--        color: $color-text-primary;-->
<!--      }-->

<!--      .el-divider&#45;&#45;horizontal {-->
<!--        margin: 0px;-->
<!--      }-->
<!--    }-->

<!--    .lsh-dialog__body {-->
<!--      padding: $space-16px;-->
<!--      color: $color-text-regular;-->
<!--      min-height: $space-48px;-->
<!--      /*max-height: 320px;*/-->
<!--      /*overflow-y: auto;*/-->
<!--      overflow: auto;-->
<!--      font-size: $font-size-base;-->
<!--      word-break: break-all;-->
<!--    }-->

<!--    .lsh-dialog__footer {-->
<!--      height: $space-56px;-->
<!--      line-height: $space-56px;-->
<!--      padding: 0 $space-16px;-->
<!--      text-align: right;-->
<!--      position: relative;-->
<!--      box-sizing: border-box;-->

<!--      /*&:before {*/-->
<!--      /*content: '';*/-->
<!--      /*position: absolute;*/-->
<!--      /*left: 0;*/-->
<!--      /*top: 0;*/-->
<!--      /*width: 100%;*/-->
<!--      /*height: 1px;*/-->
<!--      /*  background-color: $color-border;*/-->
<!--      /*}*/-->

<!--      .el-button + .el-button {-->
<!--        margin-left: $space-16px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</style>-->
