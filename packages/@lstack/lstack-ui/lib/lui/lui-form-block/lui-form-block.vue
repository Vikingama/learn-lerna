<template>
  <div class="lui-form-block" :class="{ 'has-label': label }">
    <template v-if="!!label">
      <div class="lui-form-block__side-label g-vertical-center-block">
        <span class="g-wm-vertical-lr">{{ label }}</span>
      </div>
    </template>
    <div class="lui-form-block__content">
      <template v-if="!!title">
        <lui-tip-title class="lui-form-block__content-title" :title="title" level="3"></lui-tip-title>
      </template>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import LuiTipTitle from '../lui-tip-title'

  export default {
    name: 'LuiFormBlock',
    components: { LuiTipTitle },
    props: {
      level: [String, Number],
      label: String,
      title: String,
    },
    computed: {},
  }
</script>

<style lang="scss">
  @import './lui-form-block.var';

  .lui-form-block {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    margin-right: auto;
    margin-left: auto;
    background-color: $lui-form-block--background-color;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);

    &:not(:first-child) {
      margin-top: 10px;
    }
  }
  .lui-form-block__side-label {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: $lui-form-block-side-label--width;
    padding: $lui-form-block-side-label__vertical--padding 0;
    font-size: $lui-form-block-side-label--font-size;
    line-height: $lui-form-block-side-label--width;
    letter-spacing: 4px;
    background-color: $lui-form-block-side-label--background-color;
  }
  .lui-form-block__content {
    position: relative;
    display: inline-block;
    width: 100%;
    padding: $lui-form-block-content--padding;

    .lui-form-block.has-label & {
      width: calc(100% - #{$lui-form-block-side-label--width});
      margin-left: $lui-form-block-side-label--width;
    }
  }
  .lui-form-block__content-title {
    margin-bottom: $lui-form-block-content-title--margin-bottom;
  }
</style>
