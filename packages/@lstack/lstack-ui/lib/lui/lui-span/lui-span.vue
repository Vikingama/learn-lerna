<template>
  <span class="lui-span" :class="cClasses">
    <slot></slot>
  </span>
</template>

<script>
  import { isNotEmptyText } from '@lstack/utils'

  export default {
    name: 'LuiSpan',
    props: {
      kind: {
        type: String,
        default: 'body',
        validator(val) {
          return ['display', 'title', 'body', 'caption'].indexOf(val) !== -1
        },
      },
      size: {
        type: String,
        default: 'm',
        validator(val) {
          return ['none', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'].indexOf(val) !== -1
        },
      },
      fontWeight: {
        type: String,
        validator(val) {
          return ['none', 'normal', 'bold'].indexOf(val) !== -1
        },
      },
    },
    computed: {
      cClasses() {
        const classes = [`lui-span--${this.kind}-${this.size}`]
        if (isNotEmptyText(this.fontWeight)) {
          classes.push(`lui-span--${this.fontWeight}`)
        } else if (this.kind === 'display' || this.kind === 'title') {
          classes.push('lui-span--bold')
        }
        return classes
      },
    },
  }
</script>

<style lang="scss">
  @import '~@lstack/style-scss/lib/token';
  .lui-span {
    font-weight: $font-weight-normal;
  }
  .lui-span--caption-m {
    line-height: $font-lineheight-compact;
    font-size: $font-size-caption-m;
  }
  .lui-span--body-m {
    font-size: $font-size-body-m;
  }
  .lui-span--body-l {
    font-size: $font-size-body-l;
  }
  .lui-span--title-s {
    font-size: $font-size-title-s;
  }
  .lui-span--title-m {
    font-size: $font-size-title-m;
  }
  .lui-span--title-l {
    font-size: $font-size-title-l;
  }
  .lui-span--display-s {
    font-size: $font-size-display-s;
  }
  .lui-span--display-m {
    font-size: $font-size-display-m;
  }
  .lui-span--display-l {
    font-size: $font-size-display-l;
  }
  .lui-span--display-xl {
    font-size: $font-size-display-xl;
  }
  .lui-span--display-xxl {
    font-size: $font-size-display-xxl;
  }
  .lui-span--display-xxxl {
    font-size: $font-size-display-xxxl;
  }
  .lui-span--bold {
    font-weight: $font-weight-bold;
  }
  .lui-span--normal {
    font-weight: $font-weight-normal;
  }
</style>
