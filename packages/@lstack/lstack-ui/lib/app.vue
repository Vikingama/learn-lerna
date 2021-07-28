<template>
  <app-layout ref="stack" class="app" :class="cThemeClass">
    <router-view></router-view>
  </app-layout>
</template>

<script>
  import AppLayout from './layout/app-layout'
  import LuiPageStackApiMixin from './lui/lui-page-stack/lui-page-stack-api-mixin'
  import { Themeable } from './mixin'

  export default {
    name: 'App',
    components: { AppLayout },
    mixins: [LuiPageStackApiMixin, Themeable],
    props: {
      theme: {
        type: String,
        default: 'light',
        validator(val) {
          return ['light', 'dark'].indexOf(val) !== -1
        },
      },
    },
    data() {
      return { apiHandlerInstance: undefined }
    },
    mounted() {
      this.apiHandlerInstance = this.$refs.stack
    },
  }
</script>
<style lang="scss">
  @import '~@lstack/style-scss/lib/token';

  .app {
    &.theme-light {
      color: $color-text-body;
    }
    &.theme-dark {
      color: $color-text2-body;
    }
  }
</style>
