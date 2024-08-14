<template>
  <div
    class="lui-block"
    :class="[
      `lui-block--${type}`,
      noMargin ? 'lui-block--no-margin' : '',
      marginTop ? 'lui-block--margin-top' : '',
      marginBottom ? 'lui-block--margin-bottom' : '',
    ]"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'LuiBlock',
    props: {
      noMargin: Boolean,
      marginTop: Boolean,
      marginBottom: Boolean,
      type: {
        type: String,
        default: 'primary',
        validator(val) {
          return (
            ['info', 'dark', 'hint', 'highlight', 'brand', 'primary', 'success', 'error', 'help', 'warning'].indexOf(
              val
            ) !== -1
          )
        },
      },
    },
  }
</script>

<style lang="scss">
  @import 'lui-block.var';

  .lui-block {
    font-size: $lui-block--font-size;
    padding: $lui-block--margin;
    border-width: $lui-block--border-width;
    border-style: $lui-block--border-style;
    vertical-align: top;
    border-radius: $lui-block--border-radius;
    position: relative;
    margin-left: auto;
    margin-right: auto;

    &.lui-block--no-margin {
      margin-bottom: unset;
    }

    .lui-block__tip {
      line-height: $lui-block--line-height;
    }

    //&.lui-block--dark {
    //}

    //&.lui-block--info {
    //}

    //&.lui-block--hint {
    //}

    &.lui-block--primary {
      background-color: $lui-block__primary--background-color;
      border-color: $lui-block__primary--border-color;
    }

    &.lui-block--success {
      background-color: $lui-block__success--background-color;
      border-color: $lui-block__success--border-color;
    }

    &.lui-block--error {
      background-color: $lui-block__error--background-color;
      border-color: $lui-block__error--border-color;
    }

    &.lui-block--warning {
      background-color: $lui-block__warning--background-color;
      border-color: $lui-block__warning--border-color;
    }
  }
  .lui-block--margin-top {
    margin-top: 12px;
  }
  .lui-block--margin-bottom {
    margin-bottom: 12px;
  }
</style>
