<template>
  <div class="action-filter-board-layout" :class="[marginBottom ? 'action-filter-board-layout--margin-bottom' : '']">
    <div class="action-filter-board-layout__actions">
      <slot name="actions"></slot>
    </div>
    <div class="action-filter-board-layout__filters">
      <slot name="filters"></slot>
      <rl-switch v-if="$scopedSlots.extension" v-model="extensionEnabled">
        <lui-button :icon="`el-icon-d-arrow-${extensionEnabled ? 'left' : 'right'}`" is-circle />
      </rl-switch>
      <lui-button icon="el-icon-sort" is-circle />
      <lui-button icon="el-icon-sort-down" is-circle />
      <lui-button icon="el-icon-edit-outline" is-circle />
      <lui-button icon="el-icon-refresh" is-circle />
      <lui-button icon="el-icon-download" is-circle />
    </div>
    <div v-if="extensionEnabled" class="action-filter-board-layout__extension">
      <slot name="extension"></slot>
    </div>
  </div>
</template>

<script>
  import LuiButton from '../../../lui/lui-button'
  import RlSwitch from '../../../renderless/rl-switch'

  export default {
    name: 'ActionFilterBoardLayout',
    components: { LuiButton, RlSwitch },
    props: {
      marginBottom: Boolean,
    },
    data() {
      return { extensionEnabled: false }
    },
  }
</script>

<style lang="scss">
  .action-filter-board-layout {
    overflow: hidden;
  }
  .action-filter-board-layout--margin-bottom {
    margin-bottom: 20px;
  }
  .action-filter-board-layout__actions {
    float: left;
  }
  .action-filter-board-layout__filters {
    float: right;
  }
  .action-filter-board-layout__extension {
    float: right;
    margin-top: 20px;
    padding: 20px;
    *zoom: 1;
    width: 100%;
    border-top: 1px solid #f2f5fc;
    background-color: #f2f5fc;
    box-sizing: border-box;
    border-radius: 2px;

    & > * {
      float: right;
    }
  }
</style>
