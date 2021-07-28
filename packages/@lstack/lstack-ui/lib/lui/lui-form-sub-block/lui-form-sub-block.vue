<template>
  <div class="lui-form-sub-block">
    <slot></slot>
    <rl-close v-if="showCloseButton" :on-close="closeAction">
      <el-link class="lui-form-sub-block__close">移除</el-link>
    </rl-close>
  </div>
</template>

<script>
  import RlClose from '../../renderless/rl-close'

  export default {
    name: 'LuiFormSubBlock',
    components: { RlClose },
    props: {
      closeAction: Function,
      showCloseButton: Boolean,
    },
  }
</script>

<style lang="scss">
  @import './lui-form-sub-block.var';

  .lui-form-sub-block {
    position: relative;
    padding: $lui-form-sub-block--padding;
    width: 100%;
    background-color: $lui-form-sub-block--background-color;

    .lui-form-sub-block__close {
      position: absolute;
      top: $lui-form-sub-block__close--top;
      right: $lui-form-sub-block__close--right;
    }

    &:not(:first-child) {
      margin-top: $lui-form-sub-block--margin-top;
    }
    > .el-form-item--mini.el-form-item:last-child,
    > .el-form-item--small.el-form-item:last-child {
      margin-bottom: 0;
    }
  }
</style>
