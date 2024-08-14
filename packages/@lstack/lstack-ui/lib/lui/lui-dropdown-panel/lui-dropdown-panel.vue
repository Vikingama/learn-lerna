<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <ul
      v-show="showPopper"
      class="lui-dropdown-panel el-popper"
      :class="[cThemeClass, noMargin ? 'no-margin' : '', size && `lui-dropdown-panel--${size}`]"
    >
      <slot :showDropdown="showDropdown" :hideDropdown="hideDropdown" />
    </ul>
  </transition>
</template>
<script>
  import Popper from 'element-ui/src/utils/vue-popper'
  import themeable from '../../mixin/themeable'

  export default {
    name: 'LuiDropdownPanel',

    componentName: 'ElDropdownMenu',

    mixins: [Popper, themeable],

    props: {
      visibleArrow: { type: Boolean, default: true },
      arrowOffset: { type: Number, default: 0 },
      noMargin: Boolean,
    },

    data() {
      return {
        size: this.dropdown.dropdownSize,
      }
    },

    inject: ['dropdown'],

    watch: {
      'dropdown.placement': {
        immediate: true,
        handler(val) {
          this.currentPlacement = val
        },
      },
    },
    created() {
      this.$on('updatePopper', () => {
        if (this.showPopper) this.updatePopper()
      })
      this.$on('visible', val => {
        this.showPopper = val
      })
    },

    mounted() {
      this.dropdown.popperElm = this.popperElm = this.$el
      this.referenceElm = this.dropdown.$el
      // compatible with 2.6 new v-slot syntax
      // issue link https://github.com/ElemeFE/element/issues/14345
      this.dropdown.initDomOperation()
    },
    methods: {
      showDropdown() {
        if (this.dropdown) {
          this.dropdown.visible = true
        }
      },
      hideDropdown() {
        if (this.dropdown) {
          this.dropdown.visible = false
        }
      },
    },
  }
</script>
<style lang="scss">
  .lui-dropdown-panel {
    padding: 10px 0;
    box-sizing: border-box;
    text-align: left;
    position: absolute;

    &.theme-light {
      background-color: #ffffff;
      border: 1px solid #dfe1e6;
    }
    &.theme-dark {
      background-color: #151822;
    }
    &.el-popper.no-margin {
      margin: 0;
    }
  }
</style>
