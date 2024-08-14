<template>
  <div
    class="lui-tip"
    :class="[
      inline ? 'lui-tip--is-inline' : '',
      type !== 'none' ? `lui-tip--type-${type}` : '',
      theme !== 'none' ? `lui-tip--theme-${theme}` : '',
      marginTop ? 'lui-tip--margin-top' : '',
      marginRight ? 'lui-tip--margin-right' : '',
      marginBottom ? 'lui-tip--margin-bottom' : '',
      marginLeft ? 'lui-tip--margin-left' : '',
    ]"
  >
    <slot>{{ tip }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'LuiTip',
    props: {
      tip: String,
      inline: Boolean,
      type: {
        type: String,
        default: 'default',
        validator(val) {
          return (
            ['none', 'default', 'highlight', 'brand', 'primary', 'success', 'error', 'help', 'warning'].indexOf(val) !==
            -1
          )
        },
      },
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['none', 'light', 'dark'].indexOf(val) !== -1
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
  @import 'lui-tip.var';

  .lui-tip {
    line-height: $lui-tip--line-height;
    word-break: break-all;
  }

  .lui-tip--is-inline {
    display: inline-block;
  }

  .lui-tip--margin-top {
    margin-top: $lui-tip__vertical--margin;
  }

  .lui-tip--margin-right {
    margin-right: $lui-tip__horizontal--margin;
  }

  .lui-tip--margin-bottom {
    margin-bottom: $lui-tip__vertical--margin;
  }

  .lui-tip--margin-left {
    margin-left: $lui-tip__horizontal--margin;
  }

  .lui-tip--type-default {
    &.lui-tip--theme-light {
      color: $lui-tip__theme-light-default--color;
    }
    &.lui-tip--theme-dark {
      color: $lui-tip__theme-dark-default--color;
    }
  }

  .lui-tip--type-primary {
    &.lui-tip--theme-light {
      color: $lui-tip__theme-light-primary--color;
    }
    &.lui-tip--theme-dark {
      color: $lui-tip__theme-dark-primary--color;
    }
  }

  .lui-tip--type-success {
    &.lui-tip--theme-light {
      color: $lui-tip__theme-light-success--color;
    }
    &.lui-tip--theme-dark {
      color: $lui-tip__theme-dark-success--color;
    }
  }

  .lui-tip--type-error {
    &.lui-tip--theme-light {
      color: $lui-tip__theme-light-error--color;
    }
    &.lui-tip--theme-dark {
      color: $lui-tip__theme-dark-error--color;
    }
  }

  .lui-tip--type-warning {
    &.lui-tip--theme-light {
      color: $lui-tip__theme-light-warning--color;
    }
    &.lui-tip--theme-dark {
      color: $lui-tip__theme-dark-warning--color;
    }
  }

  .lui-tip--type-help {
    &.lui-tip--theme-light {
      color: $lui-tip__theme-light-help--color;
    }
    &.lui-tip--theme-dark {
      color: $lui-tip__theme-dark-help--color;
    }
  }
</style>
