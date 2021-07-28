<template>
  <lui-tooltip
    class="lui-tip-icon"
    :class="[
      size !== 'none' ? `lui-tip-icon--size-${size}` : '',
      marginTop ? 'lui-tip-icon--margin-top' : '',
      marginRight ? 'lui-tip-icon--margin-right' : '',
      marginBottom ? 'lui-tip-icon--margin-bottom' : '',
      marginLeft ? 'lui-tip-icon--margin-left' : '',
    ]"
    :content="tip"
    :open-delay="500"
    :effect="theme"
    placement="right"
    :disabled="disabled"
  >
    <template v-if="$scopedSlots.tip" #content>
      <slot name="tip" />
    </template>
    <div class="lui-tip-icon__warp">
      <div v-if="$scopedSlots.prefix" class="lui-tip-icon__prefix">
        <slot name="prefix" />
      </div>
      <lui-icon :type="type" :icon="icon" :size="size" :theme="theme" :focusable="focusable" :hoverable="hoverable" />
      <div v-if="$scopedSlots.suffix" class="lui-tip-icon__suffix">
        <slot name="suffix" />
      </div>
    </div>
  </lui-tooltip>
</template>

<script>
  import LuiIcon from '../lui-icon'
  import LuiTooltip from '../lui-tooltip'

  export default {
    name: 'LuiTipIcon',
    components: { LuiIcon, LuiTooltip },
    props: {
      tip: String,
      icon: String,
      theme: {
        type: String,
        default: 'dark',
      },
      disabled: Boolean,
      size: {
        type: String,
        default: 's',
        validator(val) {
          // xxs: $s-2, xs: $s-3, s: $s-4, m: $s-5, l: $s-6 , xl:$s-8 , xxl: $s-12, xxxl: $s-16
          return ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'].indexOf(val) !== -1
        },
      },
      theme: String,
      type: String,
      focusable: Boolean,
      hoverable: Boolean,
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
    },
  }
</script>

<style lang="scss">
  @import 'lui-tip-icon.var';

  .lui-tip-icon {
    position: relative;
    display: inline-block;
    line-height: 1;
  }
  .lui-tip-icon__icon-warp,
  .lui-tip-icon__prefix,
  .lui-tip-icon__suffix {
    position: relative;
    display: inline-block;
  }
  .lui-tip-icon--size-xs {
    &.lui-tip-icon--margin-left {
      margin-left: $lui-tip-icon__size-xs-horizontal--margin;
    }
    &.lui-tip-icon--margin-right {
      margin-right: $lui-tip-icon__size-xs-horizontal--margin;
    }
  }

  .lui-tip-icon--size-s {
    &.lui-tip-icon--margin-left {
      margin-left: $lui-tip-icon__size-s-horizontal--margin;
    }
    &.lui-tip-icon--margin-right {
      margin-right: $lui-tip-icon__size-s-horizontal--margin;
    }
  }
</style>
