<template>
  <div v-clickoutside="{ hide }" class="lui-dropdown-trigger" :class="[cThemeClass, inline ? 'inline' : '']">
    <slot :visible="visible" />
    <slot name="dropdown" />
  </div>
</template>

<script>
  import { Dropdown } from 'element-ui'
  import VClickoutside from '../../directive/v-clickoutside'
  import { Themeable } from '../../mixin'

  export default {
    name: 'LuiDropdownTrigger',
    directives: {
      clickoutside: VClickoutside,
    },
    extends: Dropdown,
    mixins: [Themeable],
    props: {
      trigger: { type: String, default: 'hover' },
      type: String,
      size: { type: String, default: '' },
      splitButton: Boolean,
      inline: Boolean,
      hideOnClick: { type: Boolean, default: true },
      placement: { type: String, default: 'bottom-end' },
      visibleArrow: { default: true },
      showTimeout: { type: Number, default: 250 },
      hideTimeout: { type: Number, default: 150 },
      tabindex: { type: Number, default: 0 },
    },
    methods: {
      initEvent() {
        const { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this
        this.triggerElm = this.$el

        const { dropdownElm } = this

        this.triggerElm.addEventListener('keydown', handleTriggerKeyDown) // triggerElm keydown
        dropdownElm.addEventListener('keydown', handleItemKeyDown, true) // item keydown
        // 控制自定义元素的样式
        if (!splitButton) {
          this.triggerElm.addEventListener('focus', () => {
            this.focusing = true
          })
          this.triggerElm.addEventListener('blur', () => {
            this.focusing = false
          })
          this.triggerElm.addEventListener('click', () => {
            this.focusing = false
          })
        }
        if (trigger === 'hover') {
          this.triggerElm.addEventListener('mouseenter', show)
          this.triggerElm.addEventListener('mouseleave', hide)
          dropdownElm.addEventListener('mouseenter', show)
          dropdownElm.addEventListener('mouseleave', hide)
        } else if (trigger === 'click') {
          this.triggerElm.addEventListener('click', handleClick)
        }
      },
    },
  }
</script>
<style lang="scss">
  .lui-dropdown-trigger {
    display: flex;

    &.inline {
      display: inline-flex;
    }
  }
</style>
