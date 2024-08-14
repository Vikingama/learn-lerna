<template>
  <div class="fixed-submit-board">
    <div class="fixed-submit-board__inner">
      <div class="fixed-submit-board__description">
        <slot name="description" />
      </div>
      <div class="fixed-submit-board__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FixedSubmitBoard',
  }
</script>
<style lang="scss">
  @import 'fixed-submit-board.var';

  .fixed-submit-board {
    border-top: 1px solid #dbe3e4;
    background-color: #fff;
    box-shadow: 0 2px 3px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.16));
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .fixed-submit-board__inner {
    position: relative;
    padding: 20px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .fixed-submit-board__description {
  }
  .fixed-submit-board__actions {
  }
</style>
