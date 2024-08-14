<template>
  <rl-forward
    ref="forwardRef"
    :action="forwardAction"
    :to="to"
    :disabled="disabled"
    :bind-el-event="bindElEvent"
    :before-forward="beforeClose"
    :before-forward-async="beforeCloseAsync"
    @click="handleDefaultForward"
  >
    <slot v-bind="slotScopeProps" />
  </rl-forward>
</template>
<script>
  import { isFunction, logError } from '@lstack/utils'
  import InjectPageStack from '../../mixin/inject-page-stack'
  import InjectClose from '../../mixin/inject-close'
  import RlForward from '../rl-forward'

  export default {
    name: 'RlClose',
    components: { RlForward },
    mixins: [InjectPageStack, InjectClose],
    props: {
      action: {
        type: String,
        default: 'default',
        validator(val) {
          return ['default', 'closePage', 'replace', 'back', 'inject'].indexOf(val) !== -1
        },
      },
      to: [String, Object, Function],
      bindElEvent: Boolean,
      disabled: Boolean,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeClose: Function,
      beforeCloseAsync: Function,
    },
    computed: {
      slotScopeProps() {
        return {
          close: this.close,
          disabled: this.disabled,
          action: this.action,
          to: this.to,
        }
      },
      forwardAction() {
        // eslint-disable-next-line prefer-destructuring
        const action = this.action
        if (['replace', 'back'].indexOf(action) !== -1) {
          return action
        }
        return 'default'
      },
    },
    methods: {
      close() {
        this.$refs.forwardRef.forward()
      },
      doClosePage() {
        if (!this.pIsPageStack) {
          logError('当前页面不在于任何一个 PageStack 中，无法关闭')
          return
        }
        this.popTopPage()
      },
      doParentClose() {
        if (!isFunction(this.pClose)) {
          logError('当前 action 为 inject，而祖先节点中没有 provide pClose 函数，请确认 action')
          return
        }
        this.pClose()
      },
      handleDefaultForward() {
        switch (this.action) {
          case 'closePage':
            this.doClosePage()
            break
          case 'inject':
            this.doParentClose()
            break
          case 'default':
          default:
            this.$emit('click')
            break
        }
      },
    },
  }
</script>
