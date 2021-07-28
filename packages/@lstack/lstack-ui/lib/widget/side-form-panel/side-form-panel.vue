<template>
  <div class="side-form-panel">
    <div class="side-form-panel__footer">
      <div class="side-form-panel__footer-actions">
        <slot name="actions" />
      </div>
      <div class="side-form-panel__footer-description">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideFormPanel',
  }
</script>
<style lang="scss">
  @import 'side-form-panel.var';

  .side-form-panel {
    position: relative;
    margin: 0 auto;
    max-width: 1360px;
    padding-bottom: 60px;
  }
  .side-form-panel__footer {
    border-top: 1px solid #dbe3e4;
    background-color: #fff;
    box-shadow: 0 2px 3px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
</style>
