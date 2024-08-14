<template>
  <div
    class="lui-input"
    :class="[
      type === 'textarea' ? 'el-textarea' : 'el-input',
      inputSize ? 'el-input--' + inputSize : '',
      marginTop ? 'lui-input--margin-top' : '',
      marginRight ? 'lui-input--margin-right' : '',
      marginBottom ? 'lui-input--margin-bottom' : '',
      marginLeft ? 'lui-input--margin-left' : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'el-input-group': $scopedSlots.prepend || $scopedSlots.append,
        'el-input-group--append': $scopedSlots.append,
        'el-input-group--prepend': $scopedSlots.prepend,
        'el-input--prefix': $scopedSlots.prefix || prefixIcon,
        'el-input--suffix': $scopedSlots.suffix || suffixIcon || clearable || showPassword,
      },
    ]"
    :style="cStyle"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div v-if="$scopedSlots.prepend" class="el-input-group__prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        class="el-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        :aria-label="label"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
      <!-- 前置内容 -->
      <span v-if="$scopedSlots.prefix || prefixIcon" class="el-input__prefix">
        <slot name="prefix"></slot>
        <i v-if="prefixIcon" class="el-input__icon" :class="prefixIcon"></i>
      </span>
      <!-- 后置内容 -->
      <span v-if="getSuffixVisible()" class="el-input__suffix">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i v-if="suffixIcon" class="el-input__icon" :class="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            class="el-input__icon el-icon-circle-close el-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="el-input__icon el-icon-view el-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="el-input__count">
            <span class="el-input__count-inner">{{ textLength }}/{{ upperLimit }}</span>
          </span>
        </span>
        <i v-if="validateState" class="el-input__icon" :class="['el-input__validateIcon', validateIcon]"></i>
      </span>
      <!-- 后置元素 -->
      <div v-if="$scopedSlots.append" class="el-input-group__append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      ref="textarea"
      :tabindex="tabindex"
      class="el-textarea__inner"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      :aria-label="label"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" class="el-input__count">
      {{ textLength }}/{{ upperLimit }}
    </span>
  </div>
</template>
<script>
  import { Input } from 'element-ui'
  import { isEmpty } from '@lstack/utils'

  export default {
    name: 'LuiInput',
    extends: Input,
    props: {
      clearValueBeforeDestroy: Boolean,
      initialValue: {},
      valueInitializeMode: {
        type: String,
        default: 'WhenEmpty',
        validator(val) {
          return ['WhenEmpty', 'WhenChange'].indexOf(val) !== -1
        },
      },
      marginTop: Boolean,
      marginRight: Boolean,
      marginBottom: Boolean,
      marginLeft: Boolean,
      width: String,
    },
    computed: {
      cValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
          this.$emit('change', val)
        },
      },
      cStyle() {
        const width = this.width
        if (width) {
          return { width }
        }
        return undefined
      },
    },
    watch: {
      initialValue: {
        immediate: true,
        handler(newVal, oldVal) {
          if (this.valueInitializeMode === 'WhenEmpty') {
            if (isEmpty(this.cValue)) {
              this.cValue = newVal
            }
          } else if (this.valueInitializeMode === 'WhenChange') {
            // immediate 时，newVal为空时不触发，避免出现 cValue 有值反而被清的情况
            if (!(newVal === undefined && oldVal === undefined)) {
              this.cValue = newVal
            }
          }
        },
      },
    },
    beforeDestroy() {
      if (this.clearValueBeforeDestroy) {
        this.$emit('input', undefined)
        this.$emit('change', undefined)
      }
    },
  }
</script>

<style lang="scss">
  .lui-input.is-valid-error .el-input__inner.lui-input__inner,
  .lui-input.is-valid-error .el-input__inner.lui-input__inner:focus,
  .lui-input.is-valid-error .el-textarea__inner.lui-textarea__inner,
  .lui-input.is-valid-error .el-textarea__inner.lui-textarea__inner:focus {
    border-color: #f66f6a;
  }
  .lui-input--margin-left {
    margin-left: 8px;
  }
  .lui-input--margin-right {
    margin-right: 8px;
  }
  .lui-input--margin-top {
    margin-top: 12px;
  }
  .lui-input--margin-bottom {
    margin-bottom: 12px;
  }
</style>
