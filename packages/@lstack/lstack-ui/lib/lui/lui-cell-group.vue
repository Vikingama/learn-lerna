<template>
  <div class="lui-cell-group">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'LuiCellGroup',
  }
</script>
<style lang="scss">
  .lui-cell-group {
    width: 100%;
    display: inline-table;

    > * {
      display: table-cell;
    }
  }
</style>
