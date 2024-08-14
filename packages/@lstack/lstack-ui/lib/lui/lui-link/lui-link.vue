<template>
  <component
    :is="cTag"
    class="lui-link"
    :class="[
      type ? `lui-link--type-${type}` : '',
      cTheme ? `lui-link--theme-${cTheme}` : '',
      marginTop ? 'lui-link--margin-top' : '',
      marginRight ? 'lui-link--margin-right' : '',
      marginBottom ? 'lui-link--margin-bottom' : '',
      marginLeft ? 'lui-link--margin-left' : '',
      disabled ? 'is-disabled' : '',
      underline && !disabled ? 'is-underline' : '',
      highlight ? 'is-highlight' : '',
    ]"
    v-bind="{ ...$attrs, ...cProps }"
    @click="handleClick"
  >
    <lui-icon v-if="icon" :icon="icon" size="xs" margin-right />
    <slot>{{ text }}</slot>
    <slot v-if="$scopedSlots.icon" name="icon"></slot>
  </component>
</template>
<script>
  import { isEmptyText, isExternalLink, isNotEmptyText } from '@lstack/utils'
  import LuiIcon from '../lui-icon'
  import { Themeable } from '../../mixin'

  export default {
    name: 'LuiLink',
    components: { LuiIcon },
    mixins: [Themeable],
    props: {
      text: [String, Number],
      type: {
        type: String,
        default: 'primary',
        validator(val) {
          return (
            ['none', 'default', 'highlight', 'brand', 'primary', 'success', 'error', 'help', 'warning', 'info'].indexOf(
              val
            ) !== -1
          )
        },
      },
      to: [String, Object],
      href: String,
      icon: String,
      disabled: Boolean,
      external: Boolean,
      underline: { type: Boolean, default: true },
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
      highlight: Boolean,
    },
    computed: {
      cHref() {
        return isNotEmptyText(this.href) ? this.href : this.to
      },
      cTag() {
        return this.disabled || isEmptyText(this.cHref) || isExternalLink(this.cHref) ? 'a' : 'router-link'
      },
      cProps() {
        const props = {}
        if (this.external) {
          props.target = '_blank'
          props.rel = 'noopener'
        }
        if (this.cTag === 'a') {
          props.href = this.disabled ? null : this.cHref
        } else {
          props.to = this.cHref
        }
        return props
      },
    },
    watch: {
      text: {
        handler(newValue) {
          this.$emit('change', newValue)
        },
      },
    },
    methods: {
      handleClick(event) {
        if (!this.disabled) {
          if (!this.href) {
            this.$emit('click', event)
          }
        }
      },
    },
  }
</script>
<style lang="scss">
  @import './lui-link.var';

  .lui-link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    line-height: $lui-link--line-height;
    font-size: $lui-link__font-size;
    font-weight: $lui-link__font-weight;

    &.is-underline:hover:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 0;
      bottom: 0;
      border-bottom: $lui-link-underline--border-bottom;
    }

    &.is-disabled {
      cursor: not-allowed;
    }
  }

  .lui-link--margin-left {
    margin-left: $lui-link__horizontal--margin;
  }
  .lui-link--margin-right {
    margin-right: $lui-link__horizontal--margin;
  }
  .lui-link--margin-top {
    margin-top: $lui-link__vertical--margin;
  }
  .lui-link--margin-bottom {
    margin-bottom: $lui-link__vertical--margin;
  }
  .lui-link--type-default {
    color: $lui-link__type-default--color;

    &:hover,
    &.is-highlight {
      color: $lui-link__type-default-hover--color;
    }
    &:after {
      border-color: $lui-link-underline__type-default--border-color;
    }
    &.is-disabled {
      color: $lui-link__type-default-is-disabled--color;
    }
    &.is-underline:hover:after {
      border-color: $lui-link-underline__type-default-hover--border-color;
    }
  }
  .lui-link--theme-light {
    color: $lui-link__theme-light--color;

    &:hover,
    &.is-highlight {
      color: $lui-link__theme-light-hover--color;
    }
    &:after {
      border-color: $lui-link-underline__theme-light--border-color;
    }
    &.is-disabled {
      color: $lui-link__theme-light-is-disabled--color;
    }
    &.is-underline:hover:after {
      border-color: $lui-link-underline__theme-light-hover--border-color;
    }
  }
  .lui-link--theme-dark {
    color: $lui-link__theme-dark--color;

    &:hover,
    &.is-highlight {
      color: $lui-link__theme-dark-hover--color;
    }
    &:after {
      border-color: $lui-link-underline__theme-dark--border-color;
    }
    &.is-disabled {
      color: $lui-link__theme-dark-is-disabled--color;
    }
    &.is-underline:hover:after {
      border-color: $lui-link-underline__theme-dark-hover--border-color;
    }
  }
  .lui-link--type-primary {
    color: $lui-link__type-primary--color;

    &:hover,
    &.is-highlight {
      color: $lui-link__type-primary-hover--color;
    }
    &:after {
      border-color: $lui-link-underline__type-primary--border-color;
    }
    &.is-disabled {
      color: $lui-link__type-primary-is-disabled--color;
    }
    &.is-underline:hover:after {
      border-color: $lui-link-underline__type-primary-hover--border-color;
    }
  }
</style>
