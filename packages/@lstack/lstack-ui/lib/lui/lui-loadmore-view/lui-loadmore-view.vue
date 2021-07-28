<template>
  <div class="lui-loadmore-view">
    <span v-if="loading">努力加载中</span>
    <span v-else-if="isMaxPage">没有更多了</span>
    <span v-else-if="isLoadError">
      加载失败，点击
      <el-link type="primary" :underline="false" @click="reloadApi">重试</el-link>
    </span>
    <el-link v-else type="primary" :underline="false" @click="loadmoreApi">加载更多</el-link>
  </div>
</template>

<script>
  export default {
    name: 'LuiLoadmoreView',
    props: {
      loading: Boolean,
      isMaxPage: Boolean,
      isLoadError: Boolean,
      reloadApi: Function,
      loadmoreApi: Function,
    },
  }
</script>
<style lang="scss">
  .lui-loadmore-view {
    position: relative;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
</style>
