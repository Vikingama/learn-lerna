<template>
  <dialog-panel size="middle">
    <slot name="beforeTable" />
    <slot name="table">
      <pipe-pagination-table :list="list" :kv-map="kvMap" v-bind="$attrs">
        <slot />
      </pipe-pagination-table>
    </slot>
    <slot name="afterTable" />

    <template v-if="$scopedSlots.content" #content>
      <slot name="content" />
    </template>
    <template v-if="$scopedSlots.footer" #footer>
      <slot name="footer" />
    </template>
    <template v-if="$scopedSlots.footerExtension" #footerExtension>
      <slot name="footerExtension" />
    </template>
    <template v-if="$scopedSlots.footerDescription" #footerDescription>
      <slot name="footerDescription" />
    </template>
    <template v-if="$scopedSlots.footerActions" #footerActions>
      <slot name="footerActions" />
    </template>
  </dialog-panel>
</template>

<script>
  import DialogPanel from '../dialog-panel'
  import PipePaginationTable from '../../compound/pipe-pagination-table'

  export default {
    name: 'TableDialogPanel',
    components: { DialogPanel, PipePaginationTable },
    props: {
      kvMap: Object,
      list: Array,
    },
  }
</script>
