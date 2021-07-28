<template>
  <div class="action-filter-board" :class="[marginBottom ? 'action-filter-board--margin-bottom' : '']">
    <div class="action-filter-board__content">
      <div class="action-filter-board__actions">
        <slot name="actions" />
      </div>
      <div class="action-filter-board__filters">
        <!--      <rl-switch v-if="$scopedSlots.extension" #default="{ on }">-->
        <!--        <lui-button>高级搜索{{ on }}</lui-button>-->
        <!--      </rl-switch>-->
        <slot name="filters" />
        <rl-switch v-if="$scopedSlots.extension" v-model="extensionEnabled">
          <lui-button :icon="`el-icon-d-arrow-${extensionEnabled ? 'left' : 'right'}`" no-margin shape="square" />
        </rl-switch>
        <!--      <lui-tooltip :hide-after="2000" :open-delay="300" content="编辑表头" placement="top" :enterable="false">-->
        <!--        <lui-button icon="el-icon-edit-outline" no-margin shape="square" />-->
        <!--      </lui-tooltip>-->
        <refresh-icon-button :refresh-api="refreshApi" no-margin :loading="loading" />
        <!--      <lui-tooltip :hide-after="2000" :open-delay="300" content="导出" placement="top" :enterable="false">-->
        <!--        <lui-button icon="el-icon-download" no-margin shape="square" />-->
        <!--      </lui-tooltip>-->
      </div>
    </div>

    <template v-if="$scopedSlots.extension">
      <div v-show="extensionEnabled" class="action-filter-board__extension">
        <slot name="extension" />
      </div>
    </template>
  </div>
</template>

<script>
  import LuiButton from '../../lui/lui-button'
  import RlSwitch from '../../renderless/rl-switch'
  import RefreshIconButton from '../../business/refresh-icon-button'

  export default {
    name: 'ActionFilterBoard',
    components: { LuiButton, RlSwitch, RefreshIconButton },
    props: {
      marginBottom: Boolean,
      loading: Boolean,
      refreshApi: Function,
    },
    data() {
      return { extensionEnabled: false }
    },
  }
</script>

<style lang="scss">
  @import 'action-filter-board.var';

  .action-filter-board {
    position: relative;
    overflow: hidden;
  }
  .action-filter-board__content {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .action-filter-board__actions,
  .action-filter-board__filters {
    display: flex;
    position: relative;
    align-items: center;

    .el-input {
      width: auto;
    }

    & > *:not(:first-child) {
      margin-left: $action-filter-board__horizontal--margin;
    }
  }

  .action-filter-board--margin-bottom {
    margin-bottom: $action-filter-board--margin-bottom;
  }
  .action-filter-board__extension {
    margin-top: 8px;
    position: relative;
    float: right;
    padding: 8px;
    *zoom: 1;
    width: 100%;
    border-top: 1px solid #f2f5fc;
    background-color: #f2f5fc;
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
