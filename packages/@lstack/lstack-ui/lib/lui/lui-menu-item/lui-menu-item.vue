<template>
  <lui-link
    :theme="cTheme"
    :underline="false"
    type="default"
    class="lui-menu-item"
    :class="cThemeClass"
    :to="to"
    :href="href"
    :disabled="disabled"
    :external="external"
    v-on="$listeners"
  >
    <lui-icon v-if="icon" type="none" :icon="icon" size="s" margin-right />
    <slot>{{ text }}</slot>
  </lui-link>
</template>

<script>
  import { Themeable } from '../../mixin'
  import LuiLink from '../lui-link'
  import LuiIcon from '../lui-icon'

  export default {
    name: 'LuiMenuItem',
    components: { LuiLink, LuiIcon },
    mixins: [Themeable],
    props: {
      text: String,
      to: [String, Object],
      href: String,
      icon: String,
      disabled: Boolean,
      external: Boolean,
    },
  }
</script>
<style lang="scss">
  .lui-menu-item {
    display: flex;
    cursor: pointer;
    height: 32px;
    padding: 0 20px;
    justify-content: flex-start;

    &.theme-dark:hover {
      background-color: #262f3e;
    }
    &.theme-light:hover {
      background-color: #eff2fc;
    }
  }
</style>
