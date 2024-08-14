<template>
  <div class="lui-empty-view">
    <lui-icon :size="size" :type="type" icon="zanwushuju3" />
    <lui-tip margin-top :tip="tip" />
  </div>
</template>

<script>
  import LuiTip from '../lui-tip'
  import LuiIcon from '../lui-icon'

  export default {
    name: 'LuiEmptyView',
    components: { LuiTip, LuiIcon },
    props: {
      tip: { type: String, default: '暂无数据' },
      size: { type: String, default: 'xxl' },
      type: { type: String, default: 'tip' },
    },
  }
</script>

<style lang="scss">
  .lui-empty-view {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
