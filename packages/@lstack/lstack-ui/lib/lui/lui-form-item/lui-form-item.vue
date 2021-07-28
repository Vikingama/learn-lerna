<template>
  <div
    class="lui-form-item el-form-item"
    :class="[
      {
        'lui-form-item--margin-right': marginRight,
        'el-form-item--feedback': elForm && elForm.statusIcon,
        'is-error': validateState === 'error',
        'is-validating': validateState === 'validating',
        'is-success': validateState === 'success',
        'is-required': isRequired || required,
        'is-no-asterisk': elForm && elForm.hideRequiredAsterisk,
        'is-no-margin': noMargin,
        'is-inline': inline,
      },
      sizeClass ? 'el-form-item--' + sizeClass : '',
    ]"
  >
    <label-wrap :is-auto-width="labelStyle && labelStyle.width === 'auto'" :update-all="form.labelWidth === 'auto'">
      <label v-if="label || $scopedSlots.label" :for="labelFor" class="el-form-item__label" :style="labelStyle">
        <slot name="label">
          {{ label + form.labelSuffix }}
          <lui-tip-icon v-if="labelTip" margin-left size="xs" icon="question" :tip="labelTip" />
        </slot>
      </label>
    </label-wrap>
    <div
      class="el-form-item__content"
      :class="[!!contentVerticalAlign ? `el-form-item__content--align-${contentVerticalAlign}` : '']"
      :style="contentStyle"
    >
      <template v-if="messageType === 'tooltip'">
        <transition name="el-zoom-in-top">
          <lui-tooltip
            placement="right"
            :open-delay="0"
            :value="$scopedSlots.valid && validateState === 'error' && showMessage && form.showMessage"
            :manual="!isNotEmptyText(validateMessage)"
          >
            <div slot="content">
              {{ validateMessage }}
            </div>
            <slot name="valid" v-bind="{ validateMessage, validateState, validateDisabled }" />
          </lui-tooltip>
        </transition>
      </template>
      <template v-if="messageType === 'iconTip'">
        <slot name="valid" v-bind="{ validateMessage, validateState, validateDisabled }" />
        <lui-tip-icon
          v-if="validateState === 'error' && showMessage && form.showMessage"
          type="error"
          margin-left
          size="s"
          :tip="validateMessage"
          icon="el-icon-error"
        />
      </template>
      <slot v-bind="{ validateMessage, validateState, validateDisabled }"></slot>
    </div>
  </div>
</template>

<script>
  import { FormItem } from 'element-ui'
  import { isNotEmptyText } from '@lstack/utils'
  import LuiTipIcon from '../lui-tip-icon'
  import LuiTooltip from '../lui-tooltip'

  export default {
    name: 'LuiFormItem',
    components: { LuiTipIcon, LuiTooltip },
    extends: FormItem,
    props: {
      inline: Boolean,
      noMargin: Boolean,
      marginRight: Boolean,
      label: String,
      labelTip: String,
      labelWidth: String,
      prop: String,
      required: { type: Boolean, default: undefined },
      rules: [Object, Array],
      error: String,
      validateStatus: String,
      for: String,
      inlineMessage: { type: [String, Boolean], default: '' },
      showMessage: { type: Boolean, default: true },
      size: String,
      messageType: {
        type: String,
        default: 'tooltip',
        validator(val) {
          // tooltip 类型需要在 slot.valid 中插入被校验组件
          return ['tooltip', 'custom', 'iconTip'].indexOf(val) !== -1
        },
      },
      contentVerticalAlign: {
        type: String,
        validator(val) {
          return ['top', 'middle', 'bottom', 'baseline'].indexOf(val) !== -1
        },
      },
    },
    methods: {
      isNotEmptyText,
    },
  }
</script>
<style lang="scss">
  .lui-form-item--margin-right {
    margin-right: 8px;
  }
</style>
