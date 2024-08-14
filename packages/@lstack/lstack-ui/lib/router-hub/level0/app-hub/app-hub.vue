<template>
  <app-layout ref="stack">
    <router-view></router-view>
  </app-layout>
</template>

<script>
  import AppLayout from '../../../layout/app-layout'
  import LuiPageStackApiMixin from '../../../lui/lui-page-stack/lui-page-stack-api-mixin'

  export default {
    name: 'AppHub',
    components: { AppLayout },
    mixins: [LuiPageStackApiMixin],
    data() {
      return { apiHandlerInstance: undefined }
    },
    mounted() {
      this.apiHandlerInstance = this.$refs.stack
    },
  }
</script>
