<template>
  <div
    class="lui-divider"
    :class="[`lui-divider--${direction}`, `lui-divider--${cTheme}`, inline ? 'is-inline' : '', size]"
  >
    <div
      v-if="$scopedSlots.default && direction !== 'vertical'"
      class="lui-divider__text"
      :class="[`is-${contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
  import { Themeable } from '../../mixin'

  export default {
    name: 'LuiDivider',
    mixins: [Themeable],
    props: {
      size: {
        type: String,
        default: 's',
        validator(val) {
          return ['none', 'xs', 's', 'm', 'l', 'xl', 'xxl'].indexOf(val) !== -1
        },
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator(val) {
          return ['horizontal', 'vertical'].indexOf(val) !== -1
        },
      },
      contentPosition: {
        type: String,
        default: 'center',
        validator(val) {
          return ['left', 'center', 'right'].indexOf(val) !== -1
        },
      },
      inline: Boolean,
    },
  }
</script>
<style lang="scss">
  @import 'lui-divider.var';

  .lui-divider {
    position: relative;

    &.is-inline {
      display: inline-block;
    }
  }
  .lui-divider--light {
    background-color: $lui-divider__light--color;
  }
  .lui-divider--dark {
    background-color: $lui-divider__dark--color;
  }
  //border-bottom: solid 1px #e6e6e6;
  .lui-divider--horizontal {
    display: block;
    height: $lui-divider__line-width;
    width: 100%;

    &.xs {
      margin: $lui-divider__xs-padding 0;
    }
    &.s {
      margin: $lui-divider__s-padding 0;
    }
    &.m {
      margin: $lui-divider__m-padding 0;
    }
    &.l {
      margin: $lui-divider__l-padding 0;
    }
    &.xl {
      margin: $lui-divider__xl-padding 0;
    }
    &.xxl {
      margin: $lui-divider__xxl-padding 0;
    }
  }
  .lui-divider--vertical {
    display: inline-block;
    width: $lui-divider__line-width;
    height: 1em;
    vertical-align: middle;
    position: relative;

    &.xs {
      margin: auto $lui-divider__xs-padding;
    }
    &.s {
      margin: auto $lui-divider__s-padding;
    }
    &.m {
      margin: auto $lui-divider__m-padding;
    }
    &.l {
      margin: auto $lui-divider__l-padding;
    }
    &.xl {
      margin: auto $lui-divider__xl-padding;
    }
    &.xxl {
      margin: auto $lui-divider__xxl-padding;
    }
  }
  .lui-divider__text {
    &.is-left {
      left: $lui-divider-text__left;
      transform: translateY(-50%);
    }
    &.is-center {
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    &.is-right {
      right: $lui-divider-text__right;
      transform: translateY(-50%);
    }
  }
</style>
