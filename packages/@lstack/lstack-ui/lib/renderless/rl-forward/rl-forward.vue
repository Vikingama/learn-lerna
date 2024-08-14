<script>
  import { isFunction } from '@lstack/utils'
  import InjectPageStack from '../../mixin/inject-page-stack'

  export default {
    name: 'RlForward',
    mixins: [InjectPageStack],
    props: {
      action: {
        type: String,
        default: 'push',
        validator(val) {
          return ['default', 'popup', 'openPage', 'openTab', 'push', 'replace', 'back'].indexOf(val) !== -1
        },
      },
      to: [String, Object, Function],
      config: Object,
      bindElEvent: Boolean,
      disabled: Boolean,
      // 返回值为是否拦截该 forward 事务，true 为拦截，不往下继续执行
      beforeForward: Function,
      beforeForwardAsync: Function,
    },
    computed: {
      slotScopeProps() {
        return {
          forward: this.forward,
          disabled: this.disabled,
          action: this.action,
          to: this.to,
          config: this.config,
        }
      },
    },
    watch: {
      bindElEvent: {
        handler(bind) {
          if (bind) {
            this.bindElClickEvent()
          } else {
            this.unbindElClickEvent()
          }
        },
      },
    },
    mounted() {
      if (this.bindElEvent) {
        this.bindElClickEvent()
      }
    },
    beforeDestroy() {
      if (this.bindElEvent) {
        this.unbindElClickEvent()
      }
    },
    methods: {
      doPush() {
        this.$router.push(this.cTo())
      },
      doReplace() {
        this.$router.replace(this.cTo())
        // TODO: 正常 push 之后 replace 需要点两次返回，而直接浏览器敲地址过来之后的 replace 只需点一次 by 吴斌
        // 解决 replace 之后需要后退两次的问题
        // this.$router.go(-1)
      },
      doBack() {
        this.$router.back()
      },
      doOpenTab() {
        window.open(this.cTo())
      },
      doPopup() {
        this.$popup(this.cTo(), this.config)
      },
      doOpenPage() {
        this.openPage(this.cTo(), this.config)
      },
      doForward() {
        switch (this.action) {
          case 'popup':
            this.doPopup()
            break
          case 'openPage':
            this.doOpenPage()
            break
          case 'openTab':
            this.doOpenTab()
            break
          case 'replace':
            this.doReplace()
            break
          case 'back':
            this.doBack()
            break
          case 'push':
            this.doPush()
            break
          case 'default':
          default:
            this.$emit('click')
            break
        }
      },
      forward() {
        if (this.disabled) return
        if (isFunction(this.beforeForward) && this.beforeForward()) return
        if (isFunction(this.beforeForwardAsync)) {
          this.beforeForwardAsync(this.doForward)
        } else {
          this.doForward()
        }
      },
      bindElClickEvent() {
        this.$el.addEventListener('click', this.forward)
      },
      unbindElClickEvent() {
        this.$el.removeEventListener('click', this.forward)
      },
      cTo() {
        if (!isFunction(this.to)) {
          return this.to
        }
        // 函数型参数避免实时动态 to 参数时实时计算导致的性能问题，而是在 action 触发时计算一次
        return this.to()
      },
    },
    render() {
      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default(this.slotScopeProps)
      }
      return undefined
    },
  }
</script>
