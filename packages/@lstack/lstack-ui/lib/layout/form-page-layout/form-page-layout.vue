<template>
  <div class="form-page-layout">
    <div class="form-page-layout__header">
      <slot name="header"></slot>
    </div>
    <div class="form-page-layout__body">
      <slot name="body"></slot>
    </div>
    <template v-if="$scopedSlots.footer">
      <div class="form-page-layout__footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'FormPageLayout',
  }
</script>

<style lang="scss">
  .form-page-layout {
    position: relative;
    height: 100%;
    background-color: #eef0f5;
  }

  .form-page-layout__body {
    padding: 20px;
  }
</style>
