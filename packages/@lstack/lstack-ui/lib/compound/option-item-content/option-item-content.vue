<template>
  <span class="option-item-content">
    <span class="option-item-content__left">{{ left }}</span>
    <span class="option-item-content__right g-ml-3">{{ right }}</span>
  </span>
</template>

<script>
  export default {
    name: 'OptionItemContent',
    props: {
      left: String,
      right: String,
    },
  }
</script>

<style lang="scss" scoped>
  .option-item-content {
    position: relative;
  }
  .option-item-content__left {
    float: left;
  }
  .option-item-content__right {
    float: right;
    color: #c0c4cc;
  }
</style>
