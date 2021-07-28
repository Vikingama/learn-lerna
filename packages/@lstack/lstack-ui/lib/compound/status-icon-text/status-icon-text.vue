<template>
  <div
    :class="[
      inline ? 'status-icon-text--is-inline' : '',
      size !== 'none' ? `status-icon-text--size-${size}` : '',
      marginTop ? 'status-icon-text--margin-top' : '',
      marginRight ? 'status-icon-text--margin-right' : '',
      marginBottom ? 'status-icon-text--margin-bottom' : '',
      marginLeft ? 'status-icon-text--margin-left' : '',
    ]"
  >
    <status-icon :status="status" />
    <status-text :status="status" inline margin-left />
  </div>
</template>

<script>
  import StatusIcon from '../../business/status-icon'
  import StatusText from '../../business/status-text'
  import Statusable from '../../mixin/statusable'

  export default {
    name: 'StatusIconText',
    components: { StatusIcon, StatusText },
    mixins: [Statusable],
    props: {
      inline: Boolean,
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

<style lang="scss" scoped>
  @import './status-icon-text.var';

  .status-icon-text--is-inline {
    display: inline-block;
  }
  .status-icon-text--size-m {
    font-size: $status-icon-text__size-m--font-size;

    &.status-icon-text--margin-left {
      margin-left: $status-icon-text__size-m-horizontal--margin;
    }
    &.status-icon-text--margin-right {
      margin-right: $status-icon-text__size-m-horizontal--margin;
    }
    &.status-icon-text--margin-top {
      margin-top: $status-icon-text__size-m-vertical--margin;
    }
    &.status-icon-text--margin-bottom {
      margin-bottom: $status-icon-text__size-m-vertical--margin;
    }
  }
  .status-icon-text--size-l {
    font-size: $status-icon-text__size-l--font-size;

    &.status-icon-text--margin-left {
      margin-left: $status-icon-text__size-l-horizontal--margin;
    }
    &.status-icon-text--margin-right {
      margin-right: $status-icon-text__size-l-horizontal--margin;
    }
    &.status-icon-text--margin-top {
      margin-top: $status-icon-text__size-l-vertical--margin;
    }
    &.status-icon-text--margin-bottom {
      margin-bottom: $status-icon-text__size-l-vertical--margin;
    }
  }
</style>
