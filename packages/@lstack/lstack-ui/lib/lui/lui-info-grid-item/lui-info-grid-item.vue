<template>
  <div class="lui-info-grid-item">
    <div class="lui-info-grid-item__label">
      <slot name="label">{{ cLabel }}</slot>
    </div>
    <div class="lui-info-grid-item__value">
      <slot>{{ cValue }}</slot>
    </div>
  </div>
</template>

<script>
  import { isEmpty, isNotEmptyText, isObject } from '@lstack/utils'

  export default {
    name: 'LuiInfoGridItem',
    inject: {
      luiInfoGrid: {
        default: '',
      },
    },
    props: {
      label: String,
      value: String,
      prop: String,
    },
    computed: {
      cLabel() {
        if (!isEmpty(this.label)) {
          return this.label
        }
        if (isNotEmptyText(this.prop) && isObject(this.luiInfoGrid.kvMap)) {
          return this.luiInfoGrid.kvMap[this.prop]
        }
        return undefined
      },
      cValue() {
        if (!isEmpty(this.value)) {
          return this.value
        }
        if (isNotEmptyText(this.prop) && isObject(this.luiInfoGrid.info)) {
          return this.luiInfoGrid.info[this.prop]
        }
        return undefined
      },
    },
  }
</script>
<style lang="scss">
  .lui-info-grid-item {
    margin-bottom: 0 !important;

    &:before,
    &:after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .lui-info-grid-item__label {
    display: inline-block;
  }

  .lui-info-grid-item__value {
    display: inline-block;
  }
</style>
