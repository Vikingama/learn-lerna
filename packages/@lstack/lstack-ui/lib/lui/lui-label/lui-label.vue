<template>
  <span
    class="lui-label"
    :class="[
      theme ? `lui-label--${theme}` : '',
      marginTop ? 'lui-label--margin-top' : '',
      marginRight ? 'lui-label--margin-right' : '',
      marginBottom ? 'lui-label--margin-bottom' : '',
      marginLeft ? 'lui-label--margin-left' : '',
    ]"
  >
    <lui-span kind="body" size="m" font-weight="normal">
      <slot>{{ label }}</slot>
    </lui-span>
  </span>
</template>
<script>
  import LuiSpan from '../lui-span'

  export default {
    name: 'LuiLabel',
    components: { LuiSpan },
    props: {
      label: String,
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
  @import './lui-label.var';

  .lui-label {
    line-height: $lui-label--line-height;
  }
  .lui-label--margin-left {
    margin-left: $lui-label__horizontal--margin;
  }
  .lui-label--margin-right {
    margin-right: $lui-label__horizontal--margin;
  }
  .lui-label--margin-top {
    margin-top: $lui-label__vertical--margin;
  }
  .lui-label--margin-bottom {
    margin-bottom: $lui-label__vertical--margin;
  }
  .lui-label--light {
    color: $lui-label__light--color;
  }
  .lui-label--dark {
    color: $lui-label__dark--color;
  }
</style>
