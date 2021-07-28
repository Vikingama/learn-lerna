<template>
  <div class="lui-tip-title">
    <lui-title :title="title" :level="level">
      <slot></slot>
    </lui-title>
    <lui-tip-icon v-if="!!tip || $scopedSlots.tip" size="xs" margin-left class="g-va-middle" icon="question" :tip="tip">
      <slot v-if="$scopedSlots.tip" name="tip" />
    </lui-tip-icon>
  </div>
</template>

<script>
  import LuiTitle from '../lui-title'

  export default {
    name: 'LuiTipTitle',
    components: { LuiTitle },
    props: {
      level: { type: [Number, String], required: true },
      title: String,
      tip: String,
      tipPlacement: {
        type: String,
        default: 'right',
        validator(val) {
          return (
            [
              'top',
              'top-start',
              'top-end',
              'bottom',
              'bottom-start',
              'bottom-end',
              'left',
              'left-start',
              'left-end',
              'right',
              'right-start',
              'right-end',
            ].indexOf(val) !== -1
          )
        },
      },
    },
  }
</script>

<style lang="scss">
  .lui-tip-title {
    position: relative;
    display: inline-block;

    .help-tip-icon {
      cursor: help;
    }
  }
</style>
