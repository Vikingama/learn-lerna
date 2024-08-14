<template>
  <div
    class="lui-text"
    :class="[
      inline ? 'lui-text--is-inline' : '',
      size !== 'none' ? `lui-text--size-${size}` : '',
      type !== 'none' ? `lui-text--type-${type}` : '',
      cTheme !== 'none' ? `lui-text--theme-${cTheme}` : '',
      marginTop ? 'lui-text--margin-top' : '',
      marginRight ? 'lui-text--margin-right' : '',
      marginBottom ? 'lui-text--margin-bottom' : '',
      marginLeft ? 'lui-text--margin-left' : '',
    ]"
  >
    <slot>{{ text }}</slot>
  </div>
</template>
<script>
  import { Themeable } from '../../mixin'

  export default {
    name: 'LuiText',
    mixins: [Themeable],
    props: {
      text: [String, Number, Boolean],
      inline: Boolean,
      type: {
        type: String,
        default: 'default',
        validator(val) {
          return (
            ['none', 'tip', 'default', 'highlight', 'brand', 'primary', 'success', 'error', 'help', 'warning'].indexOf(
              val
            ) !== -1
          )
        },
      },
      size: {
        type: String,
        default: 'm',
        validator(val) {
          return ['m', 'l'].indexOf(val) !== -1
        },
      },
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
    },
  }
</script>
<style lang="scss">
  @import './lui-text.var';

  .lui-text {
    line-height: $lui-text--line-height;
  }
  .lui-text--is-inline {
    display: inline-block;
  }
  .lui-text--theme-light {
    &.lui-text--type-tip {
      color: $lui-text__theme-light-tip-color;
    }
    &.lui-text--type-default {
      color: $lui-text__theme-light-default--color;
    }
    &.lui-text--type-highlight {
      color: $lui-text__theme-light-highlight--color;
    }
    &.lui-text--type-brand {
      color: $lui-text__theme-light-brand--color;
    }
    &.lui-text--type-primary {
      color: $lui-text__theme-light-primary--color;
    }
    &.lui-text--type-error {
      color: $lui-text__theme-light-error--color;
    }
    &.lui-text--type-success {
      color: $lui-text__theme-light-success--color;
    }
    &.lui-text--type-warning {
      color: $lui-text__theme-light-warning--color;
    }
  }
  .lui-text--theme-dark {
    &.lui-text--type-default {
      color: $lui-text__theme-dark-default--color;
    }
    &.lui-text--type-highlight {
      color: $lui-text__theme-dark-highlight--color;
    }
    &.lui-text--type-primary {
      color: $lui-text__theme-dark-primary--color;
    }
  }
  .lui-text--theme-coloured {
    color: $lui-text__theme-coloured-default--color;
  }

  .lui-text--size-m {
    font-size: $lui-text__size-m--font-size;

    &.lui-text--margin-left {
      margin-left: $lui-text__size-m-horizontal--margin;
    }
    &.lui-text--margin-right {
      margin-right: $lui-text__size-m-horizontal--margin;
    }
    &.lui-text--margin-top {
      margin-top: $lui-text__size-m-vertical--margin;
    }
    &.lui-text--margin-bottom {
      margin-bottom: $lui-text__size-m-vertical--margin;
    }
  }
  .lui-text--size-l {
    font-size: $lui-text__size-l--font-size;

    &.lui-text--margin-left {
      margin-left: $lui-text__size-l-horizontal--margin;
    }
    &.lui-text--margin-right {
      margin-right: $lui-text__size-l-horizontal--margin;
    }
    &.lui-text--margin-top {
      margin-top: $lui-text__size-l-vertical--margin;
    }
    &.lui-text--margin-bottom {
      margin-bottom: $lui-text__size-l-vertical--margin;
    }
  }
</style>
