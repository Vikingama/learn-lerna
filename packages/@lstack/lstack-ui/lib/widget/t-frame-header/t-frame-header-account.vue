<template>
  <div class="t-frame-header-account">
    <lui-link
      class="t-frame-header-account__uc t-frame-header-account__nav"
      type="default"
      :underline="false"
      theme="dark"
      to="/"
    >
      <span>费用</span>
    </lui-link>
    <lui-link
      class="t-frame-header-account__workorder t-frame-header-account__nav"
      type="default"
      :underline="false"
      theme="dark"
      text="工单"
      :to="workorderIndexHref"
    />
    <lui-link
      class="t-frame-header-account__document t-frame-header-account__nav"
      type="default"
      :underline="false"
      theme="dark"
      text="帮助文档"
      :to="documentIndexHref"
    />
  </div>
</template>

<script>
  import { document, workorder } from '@lstack/project/src/project'

  export default {
    name: 'TFrameHeaderAccount',
    computed: {
      workorderIndexHref() {
        return workorder.routeMap.Index.getHref()
      },
      documentIndexHref() {
        return document.routeMap.Index.getHref()
      },
    },
  }
</script>
<style lang="scss">
  .t-frame-header-account {
    padding: 0 8px;
    position: relative;
    height: 100%;
  }
  .t-frame-header-account__nav {
    position: relative;
    height: 100%;
    padding: 0 8px;
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
  }
</style>
