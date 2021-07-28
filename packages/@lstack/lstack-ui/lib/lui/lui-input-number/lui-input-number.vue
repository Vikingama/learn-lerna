<template>
  <div
    :class="[
      'el-input-number',
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight },
    ]"
    @dragstart.prevent
  >
    <span
      v-if="controls"
      v-repeat-click="decrease"
      class="el-input-number__decrease"
      role="button"
      :class="{ 'is-disabled': minDisabled }"
      @keydown.enter="decrease"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
    <span
      v-if="controls"
      v-repeat-click="increase"
      class="el-input-number__increase"
      role="button"
      :class="{ 'is-disabled': maxDisabled }"
      @keydown.enter="increase"
    >
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
    <lui-input
      ref="input"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="inputNumberDisabled"
      :size="inputNumberSize"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      :width="width"
      :initial-value="initialValue"
      :clear-value-before-destroy="clearValueBeforeDestroy"
      :value-initialize-mode="valueInitializeMode"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    ></lui-input>
  </div>
</template>
<script>
  import { InputNumber } from 'element-ui'
  import RepeatClick from 'element-ui/src/directives/repeat-click'
  import LuiInput from '../lui-input'

  export default {
    name: 'LuiInputNumber',
    components: {
      LuiInput,
    },
    directives: {
      repeatClick: RepeatClick,
    },
    extends: InputNumber,
    props: {
      step: { type: Number, default: 1 },
      stepStrictly: { type: Boolean, default: false },
      max: { type: Number, default: Infinity },
      min: { type: Number, default: -Infinity },
      value: {},
      disabled: Boolean,
      size: String,
      controls: { type: Boolean, default: true },
      controlsPosition: { type: String, default: '' },
      name: String,
      label: String,
      placeholder: String,
      precision: {
        type: Number,
        validator(val) {
          return val >= 0 && val === parseInt(val, 10)
        },
      },
      clearValueBeforeDestroy: Boolean,
      initialValue: {},
      valueInitializeMode: String,
      width: String,
    },
  }
</script>
