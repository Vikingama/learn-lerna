<template>
  <div class="document-page-panel">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'DocumentPagePanel',
  }
</script>
<style lang="scss">
  .document-page-panel {
    max-width: 1320px;
    margin: 0 auto;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
</style>
