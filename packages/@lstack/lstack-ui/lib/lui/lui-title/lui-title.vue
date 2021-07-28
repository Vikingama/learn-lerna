<template>
  <component
    :is="cTag"
    class="lui-title"
    :class="[
      theme !== 'none' ? `lui-title--theme-${theme}` : '',
      size !== 'none' ? `lui-title--size-${size}` : '',
      fontWeight !== 'none' ? `lui-title--weight-${fontWeight}` : '',
      marginTop ? 'lui-title--margin-top' : '',
      marginRight ? 'lui-title--margin-right' : '',
      marginBottom ? 'lui-title--margin-bottom' : '',
      marginLeft ? 'lui-title--margin-left' : '',
    ]"
  >
    <slot>{{ title }}</slot>
  </component>
</template>
<script>
  import { isNotEmptyText } from '@lstack/utils'
  import LuiSpan from '../lui-span'

  export default {
    name: 'LuiTitle',
    components: { LuiSpan },
    props: {
      title: [String, Number],
      level: {
        type: Number,
        validator(val) {
          return [0, 1, 2, 3, 4, 5, 6].indexOf(val) !== -1
        },
      },
      size: {
        type: String,
        default: 's',
        validator(val) {
          return ['none', 's', 'm', 'l'].indexOf(val) !== -1
        },
      },
      fontWeight: {
        type: String,
        default: 'bold',
        validator(val) {
          return ['none', 'normal', 'bold'].indexOf(val) !== -1
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
    computed: {
      cLevel() {
        if (isNotEmptyText(this.level)) {
          return this.level
        }
        let level
        switch (this.size) {
          case 'l':
            level = 1
            break
          case 's':
          case 'm':
            level = 2
            break
          case 'default':
          default:
            level = 0
            break
        }
        return level
      },
      cTag() {
        return this.cLevel === 0 ? 'span' : `h${this.cLevel}`
      },
    },
  }
</script>
<style lang="scss">
  @import './lui-title.var';

  .lui-title {
    display: inline-block;
    vertical-align: middle;
    line-height: $lui-title--line-height;
  }
  .lui-title--size-s {
    font-size: $lui-title__size-s--font-size;

    &.lui-title--margin-top {
      margin-top: $lui-title__size-s-vertical--margin;
    }
    &.lui-title--margin-right {
      margin-right: $lui-title__size-s-horizontal--margin;
    }
    &.lui-title--margin-bottom {
      margin-bottom: $lui-title__size-s-vertical--margin;
    }
    &.lui-title--margin-left {
      margin-left: $lui-title__size-s-horizontal--margin;
    }
  }
  .lui-title--size-m {
    font-size: $lui-title__size-m--font-size;

    &.lui-title--margin-top {
      margin-top: $lui-title__size-m-vertical--margin;
    }
    &.lui-title--margin-right {
      margin-right: $lui-title__size-m-horizontal--margin;
    }
    &.lui-title--margin-bottom {
      margin-bottom: $lui-title__size-m-vertical--margin;
    }
    &.lui-title--margin-left {
      margin-left: $lui-title__size-m-horizontal--margin;
    }
  }
  .lui-title--size-l {
    font-size: $lui-title__size-l--font-size;

    &.lui-title--margin-top {
      margin-top: $lui-title__size-l-vertical--margin;
    }
    &.lui-title--margin-right {
      margin-right: $lui-title__size-l-horizontal--margin;
    }
    &.lui-title--margin-bottom {
      margin-bottom: $lui-title__size-l-vertical--margin;
    }
    &.lui-title--margin-left {
      margin-left: $lui-title__size-l-horizontal--margin;
    }
  }
  .lui-title--theme-light {
    color: $lui-title__theme-light--color;
  }
  .lui-title--theme-dark {
    color: $lui-title__theme-dark--color;
  }
  .lui-title--weight-normal {
    font-weight: $lui-title__weight-normal--font-weight;
  }
  .lui-title--weight-bold {
    font-weight: $lui-title__weight-bold--font-weight;
  }
</style>
