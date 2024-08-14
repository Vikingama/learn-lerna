<template>
  <div class="label-list-view">
    <lui-chip
      v-for="(label, index) in labels"
      :key="index"
      :clickable="!!$listeners.itemClick"
      class="label-list-view__item"
      @click="$emit('itemClick', label)"
    >
      {{ label }}
    </lui-chip>
  </div>
</template>

<script>
  import LuiChip from '../../lui/lui-chip'

  export default {
    name: 'LabelListView',
    components: { LuiChip },
    props: {
      labels: { type: Array, default: () => [] },
    },
  }
</script>

<style lang="scss">
  .label-list-view {
    position: relative;
    line-height: 28px;
  }

  .label-list-view__item {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
</style>
