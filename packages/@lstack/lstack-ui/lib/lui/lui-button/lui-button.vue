<template>
  <component
    :is="tag"
    class="lui-button el-button"
    :disabled="cDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? `el-button--${type}` : '',
      cSize ? `el-button--${cSize}` : '',
      cShape ? `is-${cShape}` : '',
      marginRight ? 'lui-button--margin-right' : '',
      {
        'is-disabled': cDisabled,
        'is-loading': loading,
        'is-no-margin': noMargin,
      },
      marginRight ? 'lui-button--margin-right' : '',
    ]"
    @click="handleClick"
  >
    <i v-if="loading" class="el-icon-loading"></i>
    <lui-icon v-if="icon && !loading" :icon="icon" class="icon" />
    <span v-if="$scopedSlots.default || !!text">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>
<script>
  import { isFunction } from '@lstack/utils'
  import LuiIcon from '../lui-icon'

  export default {
    name: 'LuiButton',

    inject: {
      elForm: { default: '' },
      elFormItem: { default: '' },
    },
    components: { LuiIcon },

    props: {
      text: String,
      tag: { type: String, default: 'button' },
      type: { type: String, default: 'default' },
      size: String,
      icon: { type: String, default: '' },
      nativeType: { type: String, default: 'button' },
      loading: Boolean,
      disabled: Boolean,
      autofocus: Boolean,
      noMargin: Boolean,
      marginRight: Boolean,
      shape: {
        type: String,
        validator(val) {
          return ['plain', 'round', 'circle', 'square', 'icon', 'text', 'squareIcon', 'circleIcon'].indexOf(val) !== -1
        },
      },
      // 返回值为是否拦截该 click 事务，true 为拦截，不往下继续执行
      beforeClickHandle: Function,
      beforeClickHandleAsync: Function,
    },
    computed: {
      formItemSize() {
        return (this.elFormItem || {}).elFormItemSize
      },
      cSize() {
        return this.size || this.formItemSize || (this.$ELEMENT || {}).size
      },
      cDisabled() {
        return this.disabled || (this.elForm || {}).disabled
      },
      cShape() {
        if (this.shape) {
          return this.shape
        }
        if (this.plain) return 'plain'
        if (this.round) return 'round'
        if (this.circle) return 'circle'
        return undefined
      },
    },

    methods: {
      handleClick(evt) {
        const emitClickEvent = () => {
          this.$emit('click', evt)
        }
        if (this.cDisabled || this.loading) return
        if (isFunction(this.beforeClickHandle) && this.beforeClickHandle()) return
        if (isFunction(this.beforeClickHandleAsync)) {
          this.beforeClickHandleAsync(emitClickEvent)
        } else {
          emitClickEvent()
        }
      },
    },
  }
</script>
<style lang="scss">
  .lui-button--margin-right {
    margin-right: 8px;
  }
</style>
