<template>
  <lui-block
    :no-margin="noMargin"
    :type="type"
    class="lui-block-tip"
    :margin-top="marginTop"
    :margin-bottom="marginBottom"
  >
    <lui-tip class="lui-block-tip__tip" no-margin inline :tip="tip" :type="type">
      <template v-if="$scopedSlots.default">
        <slot />
      </template>
    </lui-tip>
  </lui-block>
</template>

<script>
  import LuiBlock from '../lui-block'

  export default {
    name: 'LuiBlockTip',
    components: { LuiBlock },
    props: {
      tip: String,
      noMargin: Boolean,
      marginTop: Boolean,
      marginBottom: Boolean,
      type: {
        type: String,
        default: 'primary',
        validator(val) {
          return (
            ['light', 'dark', 'highlight', 'brand', 'primary', 'success', 'error', 'help', 'warning'].indexOf(val) !==
            -1
          )
        },
      },
    },
  }
</script>
<style lang="scss">
  .lui-block-tip {
    line-height: 1.5;
  }
</style>
