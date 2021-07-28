<template>
  <i
    class="lui-icon"
    :class="[
      cIconClass,
      size !== 'none' ? `size-${size}` : '',
      type !== 'none' ? `lui-icon--type-${type}` : '',
      theme !== 'none' ? `lui-icon--theme-${theme}` : '',
      focusable ? 'is-focusable' : '',
      hoverable ? 'is-hoverable' : '',
      marginTop ? 'margin-top' : '',
      marginRight ? 'margin-right' : '',
      marginBottom ? 'margin-bottom' : '',
      marginLeft ? 'margin-left' : '',
    ]"
  />
</template>

<script>
  import { isEmptyText, isNotEmptyText } from '@lstack/utils'

  export default {
    name: 'LuiIcon',
    props: {
      source: {
        type: String,
        default: 'lui',
        validator(val) {
          return ['lui', 'el', 'svg'].indexOf(val) !== -1
        },
      },
      icon: String,
      iconClass: String,
      focusable: Boolean,
      hoverable: Boolean,
      size: {
        type: String,
        default: 's',
        validator(val) {
          // xxs: $s-2, xs: $s-3, s: $s-4, m: $s-5, l: $s-6 , xl:$s-8 , xxl: $s-12, xxxl: $s-16
          return ['none', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'].indexOf(val) !== -1
        },
      },
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['none', 'light', 'dark'].indexOf(val) !== -1
        },
      },
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
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
    },
    computed: {
      cIconClass() {
        if (isNotEmptyText(this.iconClass)) {
          return this.iconClass
        }
        if (isEmptyText(this.icon) || this.source === 'svg') {
          return ''
        }
        if (this.icon.startsWith('lui-icon-') || this.icon.startsWith('el-icon-')) {
          return this.icon
        }
        if (this.source === 'el') {
          return `el-icon-${this.icon}`
        }
        if (this.source === 'lui') {
          return `lui-icon-${this.icon}`
        }
        return ''
      },
    },
  }
</script>

<style lang="scss">
  @import 'lui-icon.var';

  .lui-icon {
    //font-family: cloudFont !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: $lui-icon__font-weight;
    text-transform: none;
    vertical-align: inherit;
    user-select: none;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.size-xxs {
      font-size: $lui-icon__size-xxs--font-size;
    }
    &.size-xs {
      font-size: $lui-icon__size-xs--font-size;

      &.margin-left {
        margin-left: $lui-icon__size-xs-horizontal--margin;
      }
      &.margin-right {
        margin-right: $lui-icon__size-xs-horizontal--margin;
      }
    }
    &.size-s {
      font-size: $lui-icon__size-s--font-size;

      &.margin-left {
        margin-left: $lui-icon__size-s-horizontal--margin;
      }
      &.margin-right {
        margin-right: $lui-icon__size-s-horizontal--margin;
      }
    }
    &.size-m {
      font-size: $lui-icon__size-m--font-size;
    }
    &.size-l {
      font-size: $lui-icon__size-l--font-size;
    }
    &.size-xl {
      font-size: $lui-icon__size-xl--font-size;
    }
    &.size-xxl {
      font-size: $lui-icon__size-xxl--font-size;
    }
    &.size-xxxl {
      font-size: $lui-icon__size-xxxl--font-size;
    }
  }

  .lui-icon--theme-light {
    &.lui-icon--type-tip {
      color: $lui-icon__theme-light-tip-color;
    }
    &.lui-icon--type-default {
      color: $lui-icon__theme-light-default-color;
    }
    &.lui-icon--type-highlight {
      color: $lui-icon__theme-light-highlight-color;
    }
    &.lui-icon--type-error {
      color: $lui-icon__theme-light-error-color;
    }
    &.lui-icon--type-warning {
      color: $lui-icon__theme-light-warning-color;
    }
    &.lui-icon--type-success {
      color: $lui-icon__theme-light-success-color;
    }
    &.lui-icon--type-primary {
      color: $lui-icon__theme-light-primary-color;
    }
  }
  .lui-icon--theme-dark {
    &.lui-icon--type-highlight {
      color: $lui-icon__theme-dark-highlight-color;
    }
    &.lui-icon--type-error {
      color: $lui-icon__theme-dark-error-color;
    }
    &.lui-icon--type-success {
      color: $lui-icon__theme-dark-success-color;
    }
    &.lui-icon--type-warning {
      color: $lui-icon__theme-dark-warning-color;
    }
    &.lui-icon--type-primary {
      color: $lui-icon__theme-light-primary-color;
    }
  }
</style>
