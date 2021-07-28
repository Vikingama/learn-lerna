<template>
  <div class="table-page-layout">
    <div class="table-page-layout__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div class="table-page-layout__body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TablePageLayout',
  }
</script>

<style lang="scss">
  @import './table-page-layout.var.scss';

  .table-page-layout {
    width: 100%;
    height: 100%;
    padding: $table-page-layout--padding;
    overflow: auto;
  }
  .table-page-layout__header {
    position: relative;
    width: 100%;
    margin-bottom: $table-page-layout--padding;
  }
  .table-page-layout__body {
    position: relative;
    width: 100%;
    background-color: $table-page-layout-body--background-color;
  }
</style>
