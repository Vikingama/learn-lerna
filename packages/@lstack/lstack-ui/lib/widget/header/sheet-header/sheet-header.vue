<template>
  <div class="sheet-header">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="sheet-header__item"
      :class="{
        'is-disabled': optionDisable(optionValue(option), option),
      }"
      @click="handleClick(option)"
    >
      <slot
        name="content"
        :option="option"
        :option-value="optionValue(option)"
        :index="index"
        :is-active="isActive(cValue, optionValue(option))"
      >
        <lui-text type="none">{{ optionLabel(option) }}</lui-text>
      </slot>
    </div>
  </div>
</template>

<script>
import { isEmptyText } from '@lstack/utils'
import Selectable from '../../../mixin/selectable'

export default {
  name: 'SheetHeader',
  mixins: [Selectable],
  methods: {
    handleClick(option) {
      const optionValue = this.optionValue(option)
      if (!this.optionDisable(optionValue, option)) {
        this.cValue = optionValue
      }
    },
    isActive(value, optionValue) {
      if (value === undefined) return false
      if (isEmptyText(this.selectValueKey)) return value === optionValue
      return this.get(value, this.selectValueKey) === this.get(optionValue, this.selectValueKey)
    },
  },
}
</script>
<style lang="scss">
.sheet-header {
  position: relative;
  height: 100%;
}

.sheet-header__item {
  display: inline-flex;
  position: relative;
  color: #575d6c;
  height: 100%;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  cursor: pointer;

  &.is-active {
    color: #5e7ce0;
    font-weight: bold;
  }
  &.is-disabled {
    color: #adb0b8;
    cursor: not-allowed;
  }
}
</style>
