<template>
  <div class="filterable-data-panel">
    <action-filter-board margin-bottom :loading="loading" :refresh-api="refreshApi">
      <template v-if="$scopedSlots.actions" #actions>
        <slot name="actions" />
      </template>
      <template v-if="$scopedSlots.filters" #filters>
        <slot name="filters" />
      </template>
      <template v-if="$scopedSlots.filterExtension" #extension>
        <slot name="filterExtension" />
      </template>
    </action-filter-board>
    <slot />
  </div>
</template>

<script>
  import ActionFilterBoard from '../action-filter-board'

  export default {
    name: 'FilterableDataPanel',
    components: { ActionFilterBoard },
    props: {
      loading: Boolean,
      refreshApi: Function,
    },
  }
</script>
<style lang="scss">
  @import 'filterable-data-panel.var';

  .filterable-data-panel {
    position: relative;
    width: 100%;
    background-color: #fff;
    padding: 20px;

    .lui-table {
      min-height: $filterable-data-panel-table--min-height;
    }
  }
</style>
