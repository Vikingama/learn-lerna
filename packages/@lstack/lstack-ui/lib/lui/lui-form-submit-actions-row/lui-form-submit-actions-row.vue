<template>
  <el-form-item class="lui-form-submit-actions-row">
    <slot></slot>
  </el-form-item>
</template>

<script>
  export default {
    name: 'LuiFormSubmitActionsRow',
  }
</script>
<style lang="scss">
  .lui-form-submit-actions-row {
    margin-bottom: 0 !important;
  }
</style>
