<template>
  <dialog-template
    ref="templateRef"
    :size="size"
    :title="title"
    :title-tip="titleTip"
    show-right-close-button
    :header-introduction="headerIntroduction"
    :before-close="beforeClose"
    :before-close-async="beforeCloseAsync"
  >
    <template v-if="$scopedSlots.headerActions" #headerActions>
      <slot name="headerActions" />
    </template>
    <template v-if="$scopedSlots.headerIntroduction" #headerIntroduction>
      <slot name="headerIntroduction" />
    </template>

    <slot name="beforeTable" />
    <slot name="table">
      <pipe-pagination-table :list="list" :kv-map="kvMap" v-bind="$attrs">
        <slot />
      </pipe-pagination-table>
    </slot>
    <slot name="afterTable" />

    <template v-if="$scopedSlots.footerExtension" #footerExtension>
      <slot name="footerExtension" />
    </template>
    <template v-if="$scopedSlots.footerDescription" #footerDescription>
      <slot name="footerDescription" />
    </template>
    <template v-if="$scopedSlots.footerActions" #footerActions="scopeProps">
      <slot name="footerActions" v-bind="scopeProps" />
    </template>
    <template v-if="$scopedSlots.positiveAction" #positiveAction="scopeProps">
      <slot name="positiveAction" v-bind="scopeProps" />
    </template>
  </dialog-template>
</template>

<script>
  import DialogTemplate from '../dialog-template'
  import PipePaginationTable from '../../compound/pipe-pagination-table'

  export default {
    name: 'TableDialogTemplate',
    components: { DialogTemplate, PipePaginationTable },
    props: {
      size: { type: String, default: 'middle' },
      title: String,
      titleTip: String,
      headerIntroduction: String,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
      kvMap: Object,
      list: Array,
    },
    methods: {
      close() {
        this.$refs.templateRef.close()
      },
    },
  }
</script>
