<template>
  <flow-layout
    class="console-flow-frame"
    inner-class="console-flow-frame__inner"
    body-class="console-flow-frame__content"
    match-parent
  >
    <template #header>
      <t-frame-header />
    </template>
    <slot>
      <router-view />
    </slot>
  </flow-layout>
</template>

<script>
  import TFrameHeader from '../../widget/t-frame-header'
  import FlowLayout from '../../layout/flow-layout'

  export default {
    name: 'ConsoleFlowFrame',
    components: { TFrameHeader, FlowLayout },
  }
</script>
<style lang="scss">
  .console-flow-frame__inner {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #eef0f5;
  }
  .console-flow-frame__content {
    position: relative;
    padding: 20px;

    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 187px;
      background-image: url(https://cloudcache.tencentcs.com/qcloud/tea/app/overview.6bcfd5ac8b153a95aaf95ecca9b23e53.png);
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: top;
      background-color: #0e1621;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
