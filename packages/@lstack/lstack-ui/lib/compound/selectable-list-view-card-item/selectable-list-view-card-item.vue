<template>
  <div
    class="selectable-list-view-card-item"
    :class="{ 'is-active': isActive, 'is-disabled': isDisabled }"
    @click="$emit('click')"
  >
    <lui-radio :value="isActive" class="selectable-list-view-card-item__radio" :label="true" hide-label />

    <slot :isActive="isActive" />
  </div>
</template>

<script>
  import LuiRadio from '../../lui/lui-radio'

  export default {
    name: 'SelectableListViewCardItem',
    components: { LuiRadio },
    props: {
      isActive: Boolean,
      isDisabled: Boolean,
    },
  }
</script>
<style lang="scss">
  .selectable-list-view-card-item {
    width: auto;
    height: auto;
    border: 1px solid #ccc;
    font-size: 12px;
    margin: 10px 0 0;
    position: relative;

    &:not(.is-active):hover {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      border: 1px solid #ddd;
      cursor: pointer;
    }

    &.is-active {
      transition: border-color 0.2s;
      border-color: #5e7ce0;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }
  }
  .selectable-list-view-card-item__radio {
    align-self: center;
    margin-right: 12px;
  }
</style>
